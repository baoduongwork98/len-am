"use client";

import Link from "next/link";
import { handleHashClick } from "@/utils/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border-custom py-24 relative overflow-hidden bg-transparent">
      
      <div className="absolute inset-0 bg-background z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20">
        
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          
          
          <div className="col-span-1 md:col-span-6 space-y-6">
            <span className="text-2xl font-serif font-bold text-accent block">
              Len Ấm
            </span>
            <p className="text-xs text-ink-muted max-w-sm leading-relaxed font-normal">
              Nơi bắt đầu những điều nhỏ bé ấm áp từ những sợi len mềm mại. Chúng mình đồng hành cùng bạn trong từng mũi đan và từng dự án tỉ mẩn.
            </p>
            
            
            <div className="flex space-x-3.5 pt-2">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-surface border border-border-custom flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/30 shadow-warm-sm transition-all duration-300 active:scale-95"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6.5 13.25 6.5c.8 0 1.65.14 1.65.14v1.8h-.92c-.95 0-1.25.59-1.25 1.2V12h2.2l-.35 3h-1.85v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-surface border border-border-custom flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/30 shadow-warm-sm transition-all duration-300 active:scale-95"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href="#pinterest"
                className="w-9 h-9 rounded-full bg-surface border border-border-custom flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/30 shadow-warm-sm transition-all duration-300 active:scale-95"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.91 6.46 9.32-.08-.8-.16-2.03.03-2.9l1.1-4.7s-.28-.56-.28-1.4c0-1.31.76-2.3 1.7-2.3.8 0 1.2.6 1.2 1.33 0 .8-.52 2.01-.79 3.13-.22.95.47 1.72 1.4 1.72 1.69 0 2.99-1.78 2.99-4.35 0-2.27-1.63-3.86-3.96-3.86-2.7 0-4.28 2.03-4.28 4.12 0 .82.32 1.7.71 2.17.08.1.09.18.06.27l-.27 1.09c-.04.18-.15.22-.34.13-1.28-.6-1.99-2.48-1.99-4 0-3.25 2.36-6.24 6.81-6.24 3.58 0 6.36 2.55 6.36 5.96 0 3.56-2.24 6.42-5.35 6.42-1.04 0-2.03-.54-2.37-1.18l-.64 2.45c-.23.89-.86 2.01-1.28 2.68C10.02 21.84 11 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider">Liên kết</h4>
            <ul className="space-y-3 font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={link.hash ? (e) => handleHashClick(e, link.hash!) : undefined}
                    className="text-xs text-ink-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-accent uppercase tracking-wider">Cửa hàng</h4>
            <ul className="space-y-3 text-xs text-ink-muted leading-relaxed font-normal">
              <li>
                123 Đường Sợi Len, Phường Ấm Áp, Quận 1, TP. Hồ Chí Minh
              </li>
              <li>
                Hotline: 0900 123 456
              </li>
              <li>
                Mở cửa: 9:00 - 21:00 hàng ngày
              </li>
            </ul>
          </div>
        </div>

        
        <div className="pt-8 border-t border-border-custom/50 flex flex-col items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-surface border border-border-custom flex items-center justify-center text-accent shadow-warm-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.5a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-ink-muted text-center font-normal">
              &copy; {new Date().getFullYear()} Len Ấm. Thủ công từ đôi bàn tay ấm.
            </p>
            <div className="flex gap-4 text-[10px] text-ink-muted/80 font-medium">
              <a href="#privacy" className="hover:text-accent hover:underline">Chính sách bảo mật</a>
              <span className="text-border-custom">&bull;</span>
              <a href="#terms" className="hover:text-accent hover:underline">Điều khoản dịch vụ</a>
            </div>
          </div>

          
          <div className="text-accent/35 pt-2">
            <svg
              className="w-12 h-6 animate-pulse"
              viewBox="0 0 100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                d="M10,25 C10,10 40,10 50,25 C60,40 90,40 90,25 C90,10 60,10 50,25 C40,40 10,40 10,25 Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
