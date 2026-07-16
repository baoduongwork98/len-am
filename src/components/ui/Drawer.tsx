"use client";

import { motion, AnimatePresence } from "motion/react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  widthClassName?: string;
  children: React.ReactNode;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  widthClassName = "max-w-md",
  children,
}: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`fixed right-0 top-0 bottom-0 z-50 w-full ${widthClassName} bg-background p-6 shadow-2xl flex flex-col`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border-custom/50">
              <span className="font-serif text-lg font-bold text-ink">{title}</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-hover-fill flex items-center justify-center text-ink focus:outline-none"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
