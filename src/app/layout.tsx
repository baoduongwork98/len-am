import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ToastContainer from "@/components/ToastContainer";
import "./globals.css";
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Len Ấm - Sợi Len Tự Nhiên & Lớp Học Đan Thủ Công",
  description: "Nơi chia sẻ và lưu giữ những câu chuyện ấm áp qua từng sợi len. Cửa hàng len lông cừu Merino, Baby Alpaca nhập khẩu cao cấp và lớp học đan tay tại Sài Gòn.",
  openGraph: {
    title: "Len Ấm - Sợi Len Tự Nhiên & Lớp Học Đan Thủ Công",
    description: "Nơi chia sẻ và lưu giữ những câu chuyện ấm áp qua từng sợi len. Cửa hàng len lông cừu Merino, Baby Alpaca nhập khẩu cao cấp và lớp học đan tay tại Sài Gòn.",
    url: "https://lenam.vn",
    siteName: "Len Ấm",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Len Ấm - Sợi Len Tự Nhiên & Lớp Học Đan Thủ Công",
    description: "Nơi chia sẻ và lưu giữ những câu chuyện ấm áp qua từng sợi len. Cửa hàng len lông cừu Merino, Baby Alpaca nhập khẩu cao cấp và lớp học đan tay tại Sài Gòn.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fraunces.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans overflow-x-hidden selection:bg-accent/15 selection:text-accent">
        
        <div className="noise-overlay" aria-hidden="true" />
        <LoadingScreen />
        <ToastContainer />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
