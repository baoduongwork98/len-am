"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fontLoaded = false;
    let timeoutDone = false;

    const checkLoadingState = () => {
      if (fontLoaded && timeoutDone) {
        setIsLoading(false);
      }
    };

    
    if (typeof window !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => {
          fontLoaded = true;
          checkLoadingState();
        })
        .catch((err) => {
          console.error("Font loading detection failed, bypassing loader", err);
          fontLoaded = true;
          checkLoadingState();
        });
    } else {
      fontLoaded = true;
    }

    
    const timer = setTimeout(() => {
      timeoutDone = true;
      checkLoadingState();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
          }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center select-none"
        >
          
          <div className="noise-overlay" aria-hidden="true" />

          <div className="flex flex-col items-center space-y-6 relative z-10">
            
            <div className="relative w-28 h-28 flex items-center justify-center">
              
              <motion.div
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-accent/5 blur-xl"
              />

              <svg
                viewBox="0 0 100 100"
                className="w-20 h-20 text-accent relative z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                
                <motion.path
                  d="M 50,50 C 35,20 15,35 30,55 C 45,75 55,75 70,55 C 85,35 65,20 50,50 Z"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: 1 }}
                  transition={{
                    pathLength: { duration: 2.2, ease: [0.44, 0.21, 0.17, 0.96], repeat: Infinity },
                    opacity: { duration: 0.5 }
                  }}
                />
                
                
                <motion.circle
                  cx="50"
                  cy="50"
                  r="6"
                  className="fill-accent-sage/30 stroke-accent-sage"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
            </div>

            
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-3xl font-bold text-ink tracking-wide"
              >
                Len Ấm
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-muted"
              >
                Đang dệt ấm áp...
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
