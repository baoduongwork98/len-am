"use client";

import { motion } from "motion/react";
import CtaButton from "@/components/ui/CtaButton";

export default function NotFound() {
  return (
    <main className="flex-grow min-h-[70dvh] flex flex-col items-center justify-center relative overflow-hidden select-none px-6 py-32 text-center">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-7 max-w-md relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-16 h-16 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shadow-warm-sm"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </motion.div>

        <div className="space-y-3">
          <h1 className="font-serif text-7xl font-bold text-accent tracking-tighter">404</h1>
          <h2 className="font-serif text-2xl font-bold text-ink tracking-tight">
            Đường chỉ len bị đứt...
          </h2>
          <p className="text-xs text-ink-muted leading-relaxed font-normal max-w-xs mx-auto text-balance">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được dời đi nơi khác. Hãy để chúng mình đưa bạn quay về ngôi nhà ấm áp.
          </p>
        </div>

        <motion.div
          className="pt-2"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 100, damping: 18 }}
        >
          <CtaButton href="/">Quay về trang chủ</CtaButton>
        </motion.div>
      </div>
    </main>
  );
}
