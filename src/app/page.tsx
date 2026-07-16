"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "@/components/ProductCard";
import WorkshopModal from "@/components/WorkshopModal";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { useStore } from "@/store/useStore";
import { handleHashClick, scrollToSection } from "@/utils/navigation";

const fadeUpVariants = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const VALUE_PROPS = [
  {
    title: "Nguồn gốc minh bạch",
    text: "Từng lô sợi đều có mã định danh trang trại, cam kết quy trình chăn nuôi nhân đạo và thu hoạch nhân văn từ các đồng cỏ tự nhiên.",
    iconClass: "bg-accent/5 border-accent/20 text-accent",
    offset: false,
    iconPath:
      "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253"
  },
  {
    title: "Màu sắc thảo mộc",
    text: "Nhuộm thủ công từ vỏ quả óc chó, củ nghệ và chàm tự nhiên. Đảm bảo dải màu sắc mộc mạc và hoàn toàn không hóa chất gây kích ứng.",
    iconClass: "bg-accent-sage/5 border-accent-sage/20 text-accent-sage",
    offset: true,
    iconPath: "M12 3v18M3 12h18M12 3a9 9 0 1 1 0 18A9 9 0 0 1 12 3Z"
  },
  {
    title: "Chế tác chậm rãi",
    text: "Các xưởng kéo sợi gia đình gìn giữ nghề kéo sợi chậm qua nhiều thế hệ, giữ nguyên độ xốp phồng tự nhiên của xơ lông thú.",
    iconClass: "bg-accent/5 border-accent/20 text-accent",
    offset: false,
    iconPath:
      "M9.813 15.904L9 21m0 0l-.813-5.096m.813 5.096h6.75M9.813 15.904a8.25 8.25 0 0113.128-6.09m-13.128 6.09a9.022 9.022 0 01-5.626-4.938m0 0L3 11m.248-1.127A8.25 8.25 0 0118.067 4.19M3.248 9.873a9.023 9.023 0 005.626 4.939m0 0l-.813-5.096H3.248"
  }
];

const CREATIONS = [
  {
    span: "md:col-span-2",
    image: "/merino-creation.png",
    alt: "Merino Cardigan",
    tag: "Áo len vặn thừng",
    title: "Áo Cardigan Merino Cổ Điển",
    text: "Thiết kế vặn thừng truyền thống được dệt thủ công từ sợi lông cừu Merino Extra Fine siêu mềm mại."
  },
  {
    span: "md:col-span-1",
    image: "/alpaca-creation.png",
    alt: "Baby Alpaca Shawl",
    tag: "Khăn dệt tay",
    title: "Khăn Choàng Mây Alpaca",
    text: "Độ xốp mịn bay bổng dệt từ tơ Alpaca rỗng mang lại sự nhẹ bẫng và giữ ấm tuyệt hảo."
  },
  {
    span: "md:col-span-1",
    image: "/cotton-creation.png",
    alt: "Amigurumi Toy",
    tag: "Đồ chơi & Phụ kiện",
    title: "Thú Bông Amigurumi Trẻ Em",
    text: "Đan thủ công từ bông hữu cơ Ai Cập tự nhiên, an toàn tuyệt đối cho bé."
  },
  {
    span: "md:col-span-2",
    image: "/linen-creation.png",
    alt: "Linen Knitwear",
    tag: "Thời trang hè",
    title: "Áo Dệt Kim Mùa Hè Flax Linen",
    text: "Sợi lanh Bỉ dệt thưa mộc mạc dệt tay phóng khoáng, tạo cảm giác thoáng mát tự nhiên ngày hè."
  }
];

function SectionDivider() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 md:px-8">
      <div className="h-px bg-border-custom/70 flex justify-between">
        <div className="w-px h-2.5 bg-border-custom/80 -translate-y-1" />
        <div className="w-px h-2.5 bg-border-custom/80 -translate-y-1" />
      </div>
    </div>
  );
}

function ViewAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1.5">
      <span>{label}</span>
      <span>→</span>
    </Link>
  );
}

export default function Home() {
  const products = useStore((state) => state.products);
  const featuredProducts = products.filter((p) => p.featured);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const addToast = useStore((state) => state.addToast);

  // Cuộn tới section khi mở trang chủ kèm hash (vd: /#workshop)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const timer = setTimeout(() => scrollToSection(hash, "auto"), 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="flex-grow">

      <section className="relative min-h-[90dvh] pt-32 pb-24 md:pt-48 md:pb-36 flex items-center bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">


            <motion.div
              className="lg:col-span-7 space-y-6 flex flex-col items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
            >
              <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-accent/30 text-accent bg-accent/5 inline-block">
                Sợi len tự nhiên cao cấp
              </span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-ink leading-[1.15] tracking-tight text-balance">
                Dệt nên ấm áp <br />
                <span className="italic font-light text-accent">từ đôi bàn tay</span>
              </h1>

              <p className="text-ink-muted text-sm md:text-base max-w-[45ch] font-normal leading-relaxed text-balance">
                Tuyển chọn những dòng len lông cừu Merino, tơ Alpaca tơ hảo hạng nhập khẩu nguyên cuộn. Đồng hành cùng bạn kiến tạo những sản phẩm thủ công tinh xảo, bền vững cùng thời gian.
              </p>


              <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
                <CtaButton href="/yarns">Khám phá sợi len</CtaButton>

                <Link
                  href="/#workshop"
                  onClick={(e) => handleHashClick(e, "workshop")}
                  className="h-12 px-6 rounded-btn border border-border-custom hover:bg-hover-fill text-ink font-semibold text-xs active:scale-[0.98] transition-all duration-300 flex items-center justify-center"
                >
                  Lịch học Workshop
                </Link>
              </div>
            </motion.div>


            <div className="lg:col-span-5 relative flex justify-center lg:justify-end py-10">

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-sage/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-full max-w-[380px] h-[400px]">

                <motion.div
                  className="absolute left-0 top-0 w-64 h-80 double-bezel-outer shadow-warm-md cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.3 }}
                  whileHover={{ rotate: -2, y: -5, zIndex: 30 }}
                >
                  <div className="double-bezel-inner p-2">
                    <div className="relative w-full h-full rounded-inner overflow-hidden">
                      <Image
                        src="/hero-yarn.png"
                        alt="Yarn skeins close up"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>


                <motion.div
                  className="absolute right-0 bottom-0 w-56 h-72 double-bezel-outer shadow-warm-lg cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 }}
                  whileHover={{ rotate: 1, y: -5, zIndex: 30 }}
                >
                  <div className="double-bezel-inner p-1.5">
                    <div className="relative w-full h-full rounded-inner overflow-hidden">
                      <Image
                        src="/workshop-shop.png"
                        alt="Knitting workshop hands"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SectionDivider />


      <section id="story" className="py-28 md:py-36 bg-surface-alt/65 border-b border-border-custom/70">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">


            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                eyebrow="Giá trị cốt lõi"
                title={
                  <>
                    Mỗi cuộn len <br />
                    <span className="italic font-light text-accent">là một câu chuyện</span>
                  </>
                }
              />
              <p className="text-xs text-ink-muted leading-relaxed font-normal max-w-sm">
                Chúng mình tỉ mẩn trong từng khâu lựa chọn, để mỗi sợi len mang lại cảm hứng sáng tạo vô tận và sự trọn vẹn cho bạn.
              </p>

              <div className="border-l-2 border-accent/40 pl-4 py-1 italic text-xs text-ink-muted leading-relaxed max-w-sm">
                “Chúng mình tin rằng mỗi mũi đan là một khoảnh khắc kết nối giữa đôi tay và tâm hồn. Không vội vã, không tự động hóa.”
              </div>
            </div>


            <motion.div
              className="lg:col-span-7 space-y-6 flex flex-col items-stretch"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {VALUE_PROPS.map((prop) => (
                <motion.div
                  key={prop.title}
                  variants={fadeUpVariants}
                  className={`double-bezel-outer shadow-warm-sm hover:shadow-warm-md max-w-2xl ${prop.offset ? "lg:translate-x-6" : ""}`}
                >
                  <div className="double-bezel-inner p-6 flex gap-5 items-start">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ${prop.iconClass}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={prop.iconPath} />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-sm font-bold text-ink">{prop.title}</h3>
                      <p className="text-xs text-ink-muted leading-relaxed font-normal">{prop.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>


      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <SectionHeading eyebrow="Cảm hứng sáng tạo" title="Thành phẩm từ đôi bàn tay" />
            <ViewAllLink href="/yarns" label="Xem chất liệu len sợi" />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[440px]">
            {CREATIONS.map((creation) => (
              <div key={creation.title} className={`${creation.span} group double-bezel-outer shadow-warm-md hover:shadow-warm-lg`}>
                <div className="double-bezel-inner p-1 relative overflow-hidden">
                  <div className="relative w-full h-full rounded-inner overflow-hidden flex flex-col justify-end p-5">
                    <div className="absolute inset-0 bg-ink/10 z-10 transition-colors duration-500 group-hover:bg-ink/20" />
                    <Image
                      src={creation.image}
                      alt={creation.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="relative z-20 w-full mt-auto">
                      <div className="p-4 md:p-5 rounded-xl bg-surface/90 backdrop-blur-md border border-border-custom/40 shadow-warm-sm space-y-1 text-ink">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-accent block">{creation.tag}</span>
                        <h3 className="font-serif text-base md:text-lg font-bold text-ink leading-tight">{creation.title}</h3>
                        <p className="text-[10px] text-ink-muted font-normal leading-relaxed max-w-lg">{creation.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />


      <section className="py-28 md:py-36 bg-surface-alt/65 border-b border-border-custom/70">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <SectionHeading eyebrow="Được yêu thích nhất" title="Cuộn len bán chạy nhất" />
            <ViewAllLink href="/yarns" label="Xem tất cả sản phẩm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {featuredProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="double-bezel-outer max-w-3xl mx-auto shadow-warm-lg">
            <div className="double-bezel-inner p-10 md:p-16 text-center space-y-6 flex flex-col items-center">
              <SectionHeading
                eyebrow="Cộng đồng đan len"
                title="Nhận những câu chuyện ấm áp qua hộp thư"
                className="flex flex-col items-center"
                titleClassName="text-3xl md:text-5xl max-w-xl"
              />

              <p className="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
                Đăng ký để nhận thông tin về các dòng len tuyển chọn mới về hàng, bài viết chia sẻ kỹ thuật đan tay nâng cao và mã giảm giá 10% cho đơn hàng đầu tiên.
              </p>


              <div className="w-full max-w-md pt-2 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {!newsletterSuccess ? (
                    <motion.form
                      key="newsletter-form"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setNewsletterSuccess(true);
                        addToast("Đăng ký nhận thư tin thành công!", "success");
                      }}
                      className="w-full flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Địa chỉ email của bạn..."
                        className="flex-grow bg-background border border-border-custom rounded-btn px-4 py-3 text-xs text-ink focus:outline-none focus:border-accent transition-colors shadow-inner"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3.5 rounded-btn bg-accent text-surface font-semibold text-xs shadow-warm-sm hover:bg-accent-dark active:scale-[0.98] transition-all focus:outline-none flex-shrink-0"
                      >
                        Đăng ký thư
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="newsletter-success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-2 py-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent-sage/10 text-accent-sage flex items-center justify-center mx-auto border border-accent-sage/30 shadow-warm-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-ink">
                        Chào mừng bạn ghé thăm thế giới len ấm!
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        Hộp thư <span className="font-semibold text-accent">{newsletterEmail}</span> đã được ghi nhận.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />


      <section id="workshop" className="py-28 md:py-36 bg-surface-alt/35">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full aspect-[4/3] double-bezel-outer shadow-warm-md">
              <div className="double-bezel-inner p-2">
                <div className="relative w-full h-full rounded-inner overflow-hidden">
                  <Image
                    src="/workshop-shop.png"
                    alt="Len Ấm workshop space"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Trải nghiệm thủ công"
                title="Lớp học Đan len cuối tuần"
                titleClassName="text-3xl md:text-4xl"
              />
              <p className="text-xs text-ink-muted leading-relaxed max-w-lg">
                Gác lại những bộn bề công việc, tìm về sự tĩnh lặng qua từng đường kim mũi chỉ. Workshop của chúng mình hướng dẫn từ cơ bản đến nâng cao tại không gian ấm cúng tại Sài Gòn, phục vụ sẵn trà thảo mộc thơm lành.
              </p>
              <div className="pt-2">
                <CtaButton color="sage" icon="plus" onClick={() => setIsWorkshopOpen(true)}>
                  Đặt chỗ ngay
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkshopModal isOpen={isWorkshopOpen} onClose={() => setIsWorkshopOpen(false)} />
    </main>
  );
}
