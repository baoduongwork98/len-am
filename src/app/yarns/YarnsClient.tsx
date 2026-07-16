"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import ProductCard from "@/components/ProductCard";
import Drawer from "@/components/ui/Drawer";
import EmptyState from "@/components/ui/EmptyState";
import FilterSidebar, { countActiveFilters } from "@/components/yarns/FilterSidebar";
import { useStore } from "@/store/useStore";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24
    }
  }
};

export default function YarnsClient() {
  const products = useStore((state) => state.products);
  const filters = useStore((state) => state.filters);
  const setSortBy = useStore((state) => state.setSortBy);
  const resetFilters = useStore((state) => state.resetFilters);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  
  const filteredProducts = products.filter((product) => {
    if (filters.fibers.length > 0 && !filters.fibers.includes(product.fiber)) {
      return false;
    }
    if (filters.weights.length > 0 && !filters.weights.includes(product.weight)) {
      return false;
    }
    if (filters.colors.length > 0 && !product.colors.some((c) => filters.colors.includes(c.name))) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (filters.sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (filters.sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; 
  });

  const activeFiltersCount = countActiveFilters(filters);

  return (
    <main className="flex-grow pt-28 pb-24 px-6 md:px-8 max-w-7xl mx-auto w-full">
      
      <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6 tracking-wide" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent transition-colors font-medium">Trang chủ</Link>
        <span>/</span>
        <span className="text-ink font-semibold">Sợi len tuyển chọn</span>
      </nav>

      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-border-custom/50">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-[1.2] text-ink mb-2">
            Sợi len tuyển chọn
          </h1>
          <p className="text-xs text-ink-muted font-normal max-w-xl">
            Các dòng len tự nhiên từ sợi lông cừu Merino, tơ Alpaca cao cấp kết hợp lụa tơ tằm. Dành cho những dự án đan tay chứa đựng tình yêu.
          </p>
        </div>

        
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden px-4 py-2 bg-surface hover:bg-hover-fill text-xs font-semibold rounded-btn border border-border-custom text-ink flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          
          <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-btn border border-border-custom">
            <span className="text-[10px] text-ink-muted uppercase tracking-wider font-semibold">Sắp xếp</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-ink font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Nổi bật</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>
        </div>
      </div>

      
      <div className="flex gap-10">
        
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <FilterSidebar />
          </div>
        </aside>

        
        <div className="flex-grow">
          {sortedProducts.length === 0 ? (
            <div className="double-bezel-outer shadow-warm-sm w-full">
              <div className="double-bezel-inner bg-surface">
                <EmptyState
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-ink-muted/55 mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                  }
                  title="Không tìm thấy sản phẩm"
                  message="Chúng tôi không tìm thấy cuộn len nào phù hợp với các tiêu chí bộ lọc của bạn."
                >
                  <button
                    onClick={resetFilters}
                    className="mt-6 px-5 py-2.5 bg-accent hover:bg-accent-dark text-surface text-xs font-semibold rounded-btn transition-colors shadow-warm-sm focus:outline-none active:scale-[0.98]"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </EmptyState>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs text-ink-muted mb-6 font-medium">
                Hiển thị <span className="text-ink font-semibold">{sortedProducts.length}</span> sản phẩm phù hợp
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
              >
                {sortedProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants} className="h-full">
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Bộ lọc sản phẩm"
        widthClassName="max-w-sm"
      >
        <div className="flex-grow overflow-y-auto pb-6 pt-6">
          <FilterSidebar />
        </div>

        <div className="pt-4 border-t border-border-custom/50 grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => {
              resetFilters();
              setIsMobileFilterOpen(false);
            }}
            className="py-3 text-xs font-semibold text-ink border border-border-custom rounded-btn bg-surface hover:bg-hover-fill transition-colors"
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="py-3 text-xs font-semibold text-surface bg-accent hover:bg-accent-dark rounded-btn transition-colors shadow-warm-sm"
          >
            Xem kết quả ({sortedProducts.length})
          </button>
        </div>
      </Drawer>
    </main>
  );
}
