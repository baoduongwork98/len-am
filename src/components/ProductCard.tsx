"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Product, YarnColor, useStore } from "@/store/useStore";
import { formatPrice } from "@/utils/format";
import { IconCircle } from "@/components/ui/CtaButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [activeColor, setActiveColor] = useState<YarnColor>(product.colors[0]);
  const addToCart = useStore((state) => state.addToCart);
  const addToast = useStore((state) => state.addToast);

  
  const cardSpring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
  };

  const imageSpring = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25
  };

  const swatchSpring = {
    type: "spring" as const,
    stiffness: 400,
    damping: 15
  };

  return (
    <motion.div
      className="double-bezel-outer h-full text-ink hover:shadow-warm-lg shadow-warm-md group"
      whileHover={{ y: -8 }}
      transition={cardSpring}
    >
      <div className="double-bezel-inner flex flex-col p-4">
        
        <div className="relative w-full aspect-[4/5] rounded-inner overflow-hidden bg-background mb-4">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={imageSpring}
          >
            <Image
              src={activeColor.image}
              alt={`${product.name} - ${activeColor.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
          
          
          {product.featured && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-semibold bg-accent text-surface shadow-sm">
              Tuyển chọn
            </span>
          )}

          
          {product.stock <= 8 && (
            <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-accent-sage text-surface shadow-sm">
              Chỉ còn {product.stock} cuộn
            </span>
          )}
        </div>

        
        <div className="flex items-center justify-between text-xs text-ink-muted mb-1.5 font-medium">
          <span className="tracking-wide">{product.fiberDetail.split(',')[0]}</span>
          <span className="px-2 py-0.5 bg-hover-fill text-ink rounded-full text-[10px]">
            {product.weight}
          </span>
        </div>

        
        <h3 className="font-serif text-lg font-bold leading-snug mb-1.5 text-ink group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>

        
        <p className="text-xs text-ink-muted font-normal leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        
        <div className="mt-auto flex items-center justify-between gap-4 pt-3 border-t border-border-custom/50">
          <div className="flex items-center gap-2">
            {product.colors.map((color) => {
              const isSelected = activeColor.hex === color.hex;
              return (
                <motion.button
                  key={color.hex}
                  onClick={() => setActiveColor(color)}
                  className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none`}
                  style={{ backgroundColor: color.hex }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: isSelected ? 1.15 : 1,
                    boxShadow: isSelected
                      ? `0 0 0 2px var(--background), 0 0 0 3.5px var(--accent-terracotta)`
                      : `0 0 0 0px transparent`
                  }}
                  transition={swatchSpring}
                  aria-label={`Select ${color.name} color`}
                >
                  <span className="sr-only">{color.name}</span>
                </motion.button>
              );
            })}
          </div>
          
          <div className="text-right">
            <div className="text-xs text-ink-muted font-medium tracking-wide">
              {product.yardage.split('/')[0]}
            </div>
          </div>
        </div>

        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-custom/50">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-medium">Giá bán</span>
            <span className="font-serif text-base font-bold text-ink tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          
          <motion.button
            onClick={() => {
              addToCart(product, activeColor);
              addToast(`Đã thêm ${product.name} (${activeColor.name}) vào giỏ`, "success");
            }}
            className="pl-4 pr-1.5 py-1.5 rounded-btn bg-accent text-surface flex items-center gap-3 font-medium text-xs shadow-warm-sm hover:bg-accent-dark active:scale-[0.98] group focus:outline-none"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <span>Thêm vào giỏ</span>
            <IconCircle icon="plus" className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
