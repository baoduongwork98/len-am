"use client";

import { motion, AnimatePresence } from "motion/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ"
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink backdrop-blur-sm"
          />

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 240 }}
            className="double-bezel-outer w-full max-w-sm shadow-warm-lg relative z-10 pointer-events-auto"
          >
            <div className="double-bezel-inner p-6 md:p-8 text-center space-y-5 bg-surface">
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-ink">{title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed font-normal">
                  {message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-btn border border-border-custom hover:bg-hover-fill text-ink font-semibold text-xs transition-colors duration-200 focus:outline-none"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-btn bg-accent text-surface hover:bg-accent-dark active:scale-[0.98] font-semibold text-xs shadow-warm-sm transition-all duration-200 focus:outline-none"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
