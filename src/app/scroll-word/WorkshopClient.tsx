"use client";

import { motion } from "motion/react";
import ScrollWorld, { type WorkshopScene } from "@/components/workshop/ScrollWorld";
import WorkshopSignupSection from "@/components/workshop/WorkshopSignupSection";

const SCENES: WorkshopScene[] = [
  {
    id: "facade",
    clip: "/workshop/vid/scene-1.mp4",
    clipMobile: "/workshop/vid/scene-1-m.mp4",
    poster: "/workshop/posters/scene-1-poster.jpg",
    posterMobile: "/workshop/posters/scene-1-poster-m.jpg",
    still: "/workshop/raw/scene-1.jpeg",
    weight: 1.5,
    eyebrow: "Len Ấm",
    title: "Một góc phố nhỏ, nơi mọi sợi len bắt đầu",
    body: "Nép mình trên con phố yên tĩnh, Len Ấm là nơi bạn ghé qua giữa nhịp sống vội vã để tìm lại cảm giác chậm rãi của từng sợi len.",
    tags: ["Từ 2019", "Sài Gòn"],
  },
  {
    id: "shelves",
    clip: "/workshop/vid/scene-2.mp4",
    clipMobile: "/workshop/vid/scene-2-m.mp4",
    poster: "/workshop/posters/scene-2-poster.jpg",
    posterMobile: "/workshop/posters/scene-2-poster-m.jpg",
    still: "/workshop/raw/scene-2.jpeg",
    weight: 1.4,
    eyebrow: "Bộ sưu tập",
    title: "Trăm sắc màu, một chất liệu bạn tin tưởng",
    body: "Merino, Alpaca, Cotton hữu cơ... xếp thành dải màu gradient để bạn tha hồ phối ý tưởng cho dự án đan len tiếp theo.",
    tags: ["Merino", "Alpaca", "Cotton hữu cơ"],
  },
  {
    id: "workshop",
    clip: "/workshop/vid/scene-3.mp4",
    clipMobile: "/workshop/vid/scene-3-m.mp4",
    poster: "/workshop/posters/scene-3-poster.jpg",
    posterMobile: "/workshop/posters/scene-3-poster-m.jpg",
    still: "/workshop/raw/scene-3.jpeg",
    weight: 2,
    eyebrow: "Workshop cuối tuần",
    title: "Ngồi xuống, cùng đan len mỗi cuối tuần",
    body: "Một chiếc bàn dài, vài cây kim đan, và những người bạn mới.",
    extra: <WorkshopSignupSection />,
  },
  {
    id: "tools",
    clip: "/workshop/vid/scene-4.mp4",
    clipMobile: "/workshop/vid/scene-4-m.mp4",
    poster: "/workshop/posters/scene-4-poster.jpg",
    posterMobile: "/workshop/posters/scene-4-poster-m.jpg",
    still: "/workshop/raw/scene-4.jpeg",
    weight: 1.4,
    eyebrow: "Dụng cụ thủ công",
    title: "Mỗi món đồ nghề, một câu chuyện nghề",
    body: "Từ khung quay sợi đến từng cây kim móc, chúng mình chọn lọc kỹ lưỡng để hành trình đan len của bạn trọn vẹn hơn.",
    tags: ["Kim đan", "Móc len", "Guồng quay sợi"],
  },
  {
    id: "gallery",
    clip: "/workshop/vid/scene-5.mp4",
    clipMobile: "/workshop/vid/scene-5-m.mp4",
    poster: "/workshop/posters/scene-5-poster.jpg",
    posterMobile: "/workshop/posters/scene-5-poster-m.jpg",
    still: "/workshop/raw/scene-5.jpeg",
    weight: 1.7,
    eyebrow: "Thành phẩm học viên",
    title: "Thành quả của những đôi tay kiên nhẫn",
    body: "Áo len, khăn choàng, thú bông amigurumi... đây là những gì học viên Len Ấm đã tạo ra chỉ sau vài buổi học.",
    cta: { label: "Khám phá sợi len", href: "/yarns" },
  },
];

export default function WorkshopClient() {
  return (
    <main className="flex-grow">
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-20 flex items-center bg-transparent">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-accent/30 text-accent bg-accent/5 inline-block"
          >
            Một chuyến bay xuyên cửa hàng
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-ink leading-[1.15] tracking-tight text-balance"
          >
            Cuộn xuống, <span className="italic font-light text-accent">bước vào Len Ấm</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ink-muted text-sm md:text-base max-w-[55ch] mx-auto leading-relaxed text-balance"
          >
            Từ mặt tiền quán nhỏ đến góc workshop cuối tuần — camera sẽ dẫn bạn đi qua từng ngóc ngách của cửa hàng khi bạn cuộn trang.
          </motion.p>
        </div>
      </section>

      <ScrollWorld scenes={SCENES} />
    </main>
  );
}
