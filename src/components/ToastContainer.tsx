"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStore, ToastMessage } from "@/store/useStore";

export default function ToastContainer() {
  const toasts = useStore((state) => state.toasts);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 md:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }: { toast: ToastMessage }) {
  const removeToast = useStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const typeStyles = {
    success: {
      bg: "bg-surface",
      border: "border-accent-sage/30",
      iconColor: "text-accent-sage",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    error: {
      bg: "bg-surface",
      border: "border-red-400/30",
      iconColor: "text-red-500",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    info: {
      bg: "bg-surface",
      border: "border-accent/30",
      iconColor: "text-accent",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.085 1.086L12.5 13.5H13.75a.75.75 0 010 1.5H11.25a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75zM12 7.25a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      )
    }
  };

  const style = typeStyles[toast.type] || typeStyles.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="double-bezel-outer shadow-warm-md pointer-events-auto w-full"
    >
      <div className={`double-bezel-inner px-4 py-3 flex items-center justify-between gap-3 ${style.bg}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-7 h-7 rounded-full bg-background flex items-center justify-center border ${style.border} ${style.iconColor} flex-shrink-0`}>
            {style.icon}
          </div>
          <p className="text-xs text-ink font-semibold leading-normal truncate max-w-[220px] md:max-w-[260px]">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="text-ink-muted hover:text-accent text-[11px] font-bold p-1 hover:bg-hover-fill rounded-full transition-colors flex-shrink-0 w-5 h-5 flex items-center justify-center"
          aria-label="Đóng thông báo"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
