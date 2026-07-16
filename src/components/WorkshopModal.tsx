"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/store/useStore";
import { IconCircle } from "@/components/ui/CtaButton";

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkshopModal({ isOpen, onClose }: WorkshopModalProps) {
  const registerWorkshop = useStore((state) => state.registerWorkshop);
  const addToast = useStore((state) => state.addToast);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("Sáng Chủ Nhật (9:00 - 11:30)");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (p: string) => {
    
    const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
    return vnPhoneRegex.test(p);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!name.trim()) return;
    
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!validatePhone(cleanPhone)) {
      setPhoneError("Số điện thoại không đúng định dạng (ví dụ: 0912345678)");
      return;
    }

    setIsSubmitting(true);

    
    await new Promise((resolve) => setTimeout(resolve, 1200));

    registerWorkshop({
      name: name.trim(),
      phone: cleanPhone,
      session,
    });
    addToast(`Đăng ký thành công lớp đan ${session}`, "success");

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setName("");
    setPhone("");
    setSession("Sáng Chủ Nhật (9:00 - 11:30)");
    setIsSuccess(false);
    setPhoneError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={isSubmitting ? undefined : handleResetAndClose}
            className="fixed inset-0 bg-ink backdrop-blur-sm"
          />

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 240 }}
            className="double-bezel-outer w-full max-w-lg shadow-warm-lg relative z-10 pointer-events-auto"
          >
            <div className="double-bezel-inner p-8 md:p-10 text-left relative overflow-hidden bg-surface">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

              
              <button
                onClick={handleResetAndClose}
                disabled={isSubmitting}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-hover-fill hover:bg-hover-fill/80 flex items-center justify-center text-ink transition-colors duration-200 focus:outline-none disabled:opacity-50"
                aria-label="Đóng cửa sổ"
              >
                ✕
              </button>

              {isSuccess ? (
                /* SUCCESS SCREEN */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-sage/20 text-accent-sage flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-ink">Đăng ký thành công!</h3>
                    <p className="text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
                      Chào mừng bạn đến với workshop cuối tuần của <strong>Len Ấm</strong>. Chúng mình đã ghi nhận thông tin đăng ký của bạn.
                    </p>
                  </div>

                  
                  <div className="bg-background border border-border-custom rounded-inner p-5 space-y-3 text-xs text-ink text-left max-w-sm mx-auto">
                    <div className="flex justify-between border-b border-border-custom/50 pb-2">
                      <span className="text-ink-muted font-medium">Họ và tên:</span>
                      <span className="font-semibold text-right">{name}</span>
                    </div>
                    <div className="flex justify-between border-b border-border-custom/50 pb-2">
                      <span className="text-ink-muted font-medium">Số điện thoại:</span>
                      <span className="font-semibold text-right">{phone}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-ink-muted font-medium">Buổi học chọn:</span>
                      <span className="font-semibold text-right text-accent">{session}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-ink-muted italic">
                    * Bạn có thể xem lại hoặc hủy lớp đã đăng ký trong tab “Workshop” ở Giỏ hàng.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleResetAndClose}
                      className="px-8 py-3 rounded-btn bg-accent text-surface text-xs font-semibold shadow-warm-sm hover:bg-accent-dark active:scale-95 transition-all duration-200"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* REGISTRATION FORM SCREEN */
                <div className="space-y-6">
                  <div className="space-y-2 pr-6">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-accent block">Workshop Cuối Tuần</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold leading-[1.2] text-ink">
                      Đăng ký Lớp học Đan len
                    </h2>
                    <p className="text-xs text-ink-muted font-light leading-relaxed">
                      Vui lòng nhập thông tin của bạn để giữ chỗ. Chúng mình sẽ liên hệ sớm nhất để xác nhận lại vị trí.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="space-y-1.5">
                      <label htmlFor="modal-name" className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5">
                        Họ và tên
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Khánh An"
                        className="w-full px-4 py-3 rounded-btn bg-background border border-border-custom text-ink placeholder-ink-muted/40 text-base focus:outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50"
                      />
                    </div>

                    
                    <div className="space-y-1.5">
                      <label htmlFor="modal-phone" className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5">
                        Số điện thoại
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        disabled={isSubmitting}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder="Ví dụ: 0912345678"
                        className={`w-full px-4 py-3 rounded-btn bg-background border ${phoneError ? "border-red-400 focus:border-red-400" : "border-border-custom focus:border-accent"} text-ink placeholder-ink-muted/40 text-base focus:outline-none transition-colors duration-200 disabled:opacity-50`}
                      />
                      {phoneError && (
                        <p className="text-[10px] text-red-500 font-medium pl-0.5 animate-fadeIn">
                          {phoneError}
                        </p>
                      )}
                    </div>

                    
                    <div className="space-y-1.5">
                      <label htmlFor="modal-session" className="text-[10px] font-bold text-ink uppercase tracking-wider pl-0.5">
                        Chọn buổi học phù hợp
                      </label>
                      <div className="relative">
                        <select
                          id="modal-session"
                          disabled={isSubmitting}
                          value={session}
                          onChange={(e) => setSession(e.target.value)}
                          className="w-full px-4 py-3 rounded-btn bg-background border border-border-custom text-ink text-xs focus:outline-none focus:border-accent appearance-none transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option>Sáng Thứ Bảy (9:00 - 11:30)</option>
                          <option>Chiều Thứ Bảy (14:00 - 16:30)</option>
                          <option>Sáng Chủ Nhật (9:00 - 11:30)</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-ink-muted">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full pl-6 pr-3 py-3.5 rounded-btn bg-accent text-surface flex items-center justify-between font-semibold text-xs shadow-warm-md hover:bg-accent-dark active:scale-[0.98] transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed group"
                      >
                        <span>{isSubmitting ? "Đang xử lý đăng ký..." : "Xác nhận đặt chỗ"}</span>
                        <IconCircle className="w-7 h-7" iconClassName="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
