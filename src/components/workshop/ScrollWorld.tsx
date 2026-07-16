"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import CtaButton from "@/components/ui/CtaButton";

export interface WorkshopScene {
  id: string;
  clip: string;
  clipMobile?: string;
  poster: string;
  posterMobile?: string;
  still: string;
  /** relative scroll dwell for this scene, in viewport-height multiples */
  weight?: number;
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  cta?: { label: string; href: string };
  extra?: React.ReactNode;
}

const CROSSFADE = 0.15; // fraction of a scene's local progress spent dissolving into the next clip
const DEFAULT_WEIGHT = 1.4;

function SceneCopy({ scene }: { scene: WorkshopScene }) {
  if (scene.extra) return <>{scene.extra}</>;
  return (
    <div className="glass-bezel-outer max-w-lg transition-fluid">
      <div className="glass-bezel-inner p-6 md:p-8 space-y-4 text-surface">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
          {scene.eyebrow}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold leading-[1.15] text-balance text-surface">
          {scene.title}
        </h2>
        <p className="text-xs md:text-sm text-surface/80 max-w-[42ch] leading-relaxed">
          {scene.body}
        </p>
        {scene.tags && scene.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {scene.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest border border-white/15 bg-white/5 text-white/90 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {scene.cta && (
          <div className="pt-2">
            <CtaButton href={scene.cta.href}>
              {scene.cta.label}
            </CtaButton>
          </div>
        )}
      </div>
    </div>
  );
}

function StillSceneBlock({ scene }: { scene: WorkshopScene }) {
  return (
    <section className="relative min-h-[80dvh] flex items-end overflow-hidden">
      <Image src={scene.still} alt={scene.title} fill priority={false} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/25" />
      <div className="relative z-10 p-6 md:p-14 w-full max-w-xl">
        <SceneCopy scene={scene} />
      </div>
    </section>
  );
}

export default function ScrollWorld({ scenes }: { scenes: WorkshopScene[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const primedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const weights = scenes.map((s) => s.weight ?? DEFAULT_WEIGHT);
  const total = weights.reduce((a, b) => a + b, 0);
  const starts = weights.reduce<number[]>((acc, w, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + weights[i - 1]);
    return acc;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Phone-class only (short side <=600 CSS px) — tablets/iPads keep the desktop master.
    const mq = window.matchMedia("(max-width: 600px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lazy-prefetch the clips around the active scene so entering one doesn't stall on a cold fetch.
  useEffect(() => {
    [active - 1, active, active + 1].forEach((i) => {
      const vid = videoRefs.current[i];
      if (vid && vid.preload !== "auto") vid.preload = "auto";
    });
  }, [active]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // iOS leaves a paused, never-played <video> blank until primed by a real user gesture.
  const primeIOS = useCallback(() => {
    if (primedRef.current) return;
    primedRef.current = true;
    videoRefs.current.forEach((v) => {
      if (!v) return;
      const p = v.play();
      if (p) p.then(() => v.pause()).catch(() => {});
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reducedMotion) return;
    primeIOS();

    const units = v * total;
    let idx = scenes.length - 1;
    for (let i = 0; i < starts.length; i++) {
      if (units < starts[i] + weights[i]) {
        idx = i;
        break;
      }
    }
    const local = Math.min(1, Math.max(0, (units - starts[idx]) / weights[idx]));
    setActive(idx);

    const isLast = idx === scenes.length - 1;
    const fadeStart = 1 - CROSSFADE;
    const curOpacity = isLast || local < fadeStart ? 1 : 1 - (local - fadeStart) / CROSSFADE;
    const nextOpacity = !isLast && local >= fadeStart ? (local - fadeStart) / CROSSFADE : 0;

    scenes.forEach((_, i) => {
      const vid = videoRefs.current[i];
      if (!vid) return;
      vid.style.opacity = i === idx ? String(curOpacity) : i === idx + 1 ? String(nextOpacity) : "0";
    });

    // Skip the seek while a previous one is still in flight (video.seeking) instead of queueing
    // it — a fast flick would otherwise pile up seeks and freeze the clip. The next scroll tick
    // (many fire per second) just retries with a fresher target once the video is ready.
    const curVid = videoRefs.current[idx];
    if (curVid && curVid.duration && !curVid.seeking) {
      curVid.currentTime = Math.min(local, 0.999) * curVid.duration;
    }

    if (nextOpacity > 0) {
      const nextVid = videoRefs.current[idx + 1];
      if (nextVid && nextVid.duration && !nextVid.seeking) {
        nextVid.currentTime = nextOpacity * Math.min(0.6, nextVid.duration * 0.15);
      }
    }
  });

  const scrollToScene = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.offsetTop + (starts[i] / total) * el.offsetHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: reducedMotion ? "auto" : `${total * 100}vh` }}>
      {reducedMotion ? (
        <div className="flex flex-col">
          {scenes.map((s) => (
            <StillSceneBlock key={s.id} scene={s} />
          ))}
        </div>
      ) : (
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-yarn-ink">
          {scenes.map((s, i) => (
            <video
              key={s.id}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={isMobile && s.clipMobile ? s.clipMobile : s.clip}
              poster={isMobile && s.posterMobile ? s.posterMobile : s.poster}
              muted
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30 pointer-events-none" />

          <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20 pointer-events-auto font-sans">
            {scenes.map((s, i) => {
              const isSelected = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToScene(i)}
                  className="group relative flex items-center justify-end gap-3 text-right focus:outline-none cursor-pointer"
                >
                  <span
                    className={`hidden md:block text-[9px] uppercase tracking-widest font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isSelected
                        ? "opacity-90 translate-x-0 text-accent bg-accent/10 px-2.5 py-0.5 rounded-full"
                        : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-surface"
                    }`}
                  >
                    {s.eyebrow}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold tracking-wider transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isSelected ? "text-accent scale-110" : "text-surface/40 group-hover:text-surface/80"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div
                      className={`h-[1px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isSelected ? "w-8 bg-accent" : "w-3 bg-surface/30 group-hover:w-5 group-hover:bg-surface/60"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="absolute inset-0 flex flex-col justify-end md:justify-center z-10 pointer-events-none">
            <div className="p-6 md:p-14 w-full md:max-w-xl max-h-[75dvh] overflow-y-auto pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scenes[active].id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <SceneCopy scene={scenes[active]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Crawlable copy mirror — the pinned stage above renders client-side only per scroll position. */}
      {!reducedMotion && (
        <div className="sr-only">
          {scenes.map((s) => (
            <section key={s.id}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
