"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/store/useStore";
import CtaButton from "@/components/ui/CtaButton";

const SESSIONS = [
  "Sáng Thứ Bảy (9:00 - 11:30)",
  "Chiều Thứ Bảy (14:00 - 16:30)",
  "Sáng Chủ Nhật (9:00 - 11:30)",
];

const VN_PHONE_REGEX = /^(03|05|07|08|09)\d{8}$/;

export default function WorkshopSignupSection() {
  const registerWorkshop = useStore((state) => state.registerWorkshop);
  const addToast = useStore((state) => state.addToast);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState(SESSIONS[2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    setNameError("");
    
    let hasError = false;
    if (!name.trim()) {
      setNameError("Vui lòng nhập họ và tên của bạn");
      hasError = true;
    }

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!VN_PHONE_REGEX.test(cleanPhone)) {
      setPhoneError("Số điện thoại không đúng định dạng (ví dụ: 0912345678)");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    registerWorkshop({ name: name.trim(), phone: cleanPhone, session });
    addToast(`Đăng ký thành công lớp đan ${session}`, "success");
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="double-bezel-outer w-full max-w-md pointer-events-auto shadow-warm-lg transition-fluid">
      <div className="double-bezel-inner p-6 md:p-7 bg-surface">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="space-y-5 py-2 text-ink"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-11 h-11 rounded-full bg-accent-sage/10 text-accent-sage flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold">Đã giữ chỗ cho bạn!</h3>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Len Ấm đã ghi nhận thông tin đăng ký lớp đan len của bạn.
                </p>
              </div>

              {/* Ticket UI */}
              <div className="border border-dashed border-border-custom bg-background/50 rounded-inner overflow-hidden p-4 space-y-4 relative">
                {/* Ticket side cutouts */}
                <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-surface border border-border-custom rounded-full -translate-y-1/2" />
                <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-surface border border-border-custom rounded-full -translate-y-1/2" />

                <div className="text-center pb-2 border-b border-dashed border-border-custom/80">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-accent">
                    Vé Workshop Đan Len
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] md:text-xs">
                  <div>
                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Người nhận</span>
                    <strong className="font-medium text-ink">{name}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Số điện thoại</span>
                    <strong className="font-medium text-ink">{phone}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Buổi học</span>
                    <strong className="font-medium text-accent">{session}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] text-ink-muted uppercase tracking-wider block">Địa điểm</span>
                    <span className="text-ink-muted text-[10px] md:text-xs">Cửa hàng Len Ấm, Quận 1, Sài Gòn</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-center text-ink-muted italic">
                Chúng mình sẽ liên hệ lại qua điện thoại để xác nhận trước ngày diễn ra.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-accent block">
                  Workshop Cuối Tuần
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink leading-tight">
                  Đăng ký lớp đan len
                </h3>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="sw-name" className="text-[10px] font-bold text-ink uppercase tracking-wider">
                  Họ và tên
                </label>
                <input
                  id="sw-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError("");
                  }}
                  placeholder="Ví dụ: Khánh An"
                  className={`w-full px-4 py-2.5 rounded-btn bg-background border ${
                    nameError ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-border-custom focus:border-accent focus:ring-accent/15"
                  } text-ink placeholder-ink-muted/40 text-xs focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50`}
                />
                {nameError && <p className="text-[10px] text-red-500 font-medium">{nameError}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="sw-phone" className="text-[10px] font-bold text-ink uppercase tracking-wider">
                  Số điện thoại
                </label>
                <input
                  id="sw-phone"
                  type="tel"
                  required
                  disabled={isSubmitting}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  placeholder="Ví dụ: 0912345678"
                  className={`w-full px-4 py-2.5 rounded-btn bg-background border ${
                    phoneError ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "border-border-custom focus:border-accent focus:ring-accent/15"
                  } text-ink placeholder-ink-muted/40 text-xs focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50`}
                />
                {phoneError && <p className="text-[10px] text-red-500 font-medium">{phoneError}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="sw-session" className="text-[10px] font-bold text-ink uppercase tracking-wider">
                  Chọn buổi học
                </label>
                <div className="relative">
                  <select
                    id="sw-session"
                    disabled={isSubmitting}
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-btn bg-background border border-border-custom text-ink text-xs focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 appearance-none transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {SESSIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-ink-muted">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <CtaButton
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-between"
              >
                {isSubmitting ? "Đang xử lý..." : "Giữ chỗ ngay"}
              </CtaButton>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
