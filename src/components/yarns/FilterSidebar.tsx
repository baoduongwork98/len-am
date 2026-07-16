"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/utils/format";

const FIBER_OPTIONS = ["Merino", "Alpaca", "Silk", "Cotton", "Linen"];
const WEIGHT_OPTIONS = ["Fingering", "Sport", "DK", "Worsted", "Chunky"];
const COLOR_OPTIONS = [
  { name: "Oat Milk", hex: "#EAE2D6" },
  { name: "Sage", hex: "#93A382" },
  { name: "Terracotta", hex: "#C17A56" },
];
const QUICK_PRICE_RANGES: [number, number][] = [
  [100000, 300000],
  [300000, 600000],
];

export const DEFAULT_PRICE_RANGE: [number, number] = [100000, 600000];

export function countActiveFilters(filters: {
  fibers: string[];
  weights: string[];
  colors: string[];
  priceRange: [number, number];
}): number {
  return (
    filters.fibers.length +
    filters.weights.length +
    filters.colors.length +
    (filters.priceRange[0] > DEFAULT_PRICE_RANGE[0] || filters.priceRange[1] < DEFAULT_PRICE_RANGE[1] ? 1 : 0)
  );
}

function FilterSection({
  label,
  last = false,
  contentClassName = "space-y-2",
  children,
}: {
  label: string;
  last?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`pb-4 ${last ? "" : "border-b border-border-custom/50"}`}>
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between w-full text-left font-serif text-sm font-semibold text-ink mb-2 tracking-wide focus:outline-none cursor-pointer"
      >
        <span>{label}</span>
        <motion.span
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-muted"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`overflow-hidden pt-1 ${contentClassName}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 text-xs text-ink-muted cursor-pointer hover:text-ink transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-border-custom text-accent focus:ring-accent accent-accent"
      />
      <span className={checked ? "text-ink font-medium" : ""}>{label}</span>
    </label>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-hover-fill text-ink font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-accent font-bold focus:outline-none">
        ×
      </button>
    </span>
  );
}

export default function FilterSidebar() {
  const filters = useStore((state) => state.filters);
  const toggleFiber = useStore((state) => state.toggleFiber);
  const toggleWeight = useStore((state) => state.toggleWeight);
  const toggleColor = useStore((state) => state.toggleColor);
  const setPriceRange = useStore((state) => state.setPriceRange);
  const resetFilters = useStore((state) => state.resetFilters);

  const activeFiltersCount = countActiveFilters(filters);
  const priceFiltered =
    filters.priceRange[0] > DEFAULT_PRICE_RANGE[0] || filters.priceRange[1] < DEFAULT_PRICE_RANGE[1];

  return (
    <div className="space-y-6 pr-4">
      
      {activeFiltersCount > 0 && (
        <div className="p-4 bg-surface rounded-inner border border-border-custom/80 shadow-warm-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider">
              Đang chọn ({activeFiltersCount})
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-accent hover:underline font-medium focus:outline-none"
            >
              Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.fibers.map((f) => (
              <FilterChip key={f} label={f} onRemove={() => toggleFiber(f)} />
            ))}
            {filters.weights.map((w) => (
              <FilterChip key={w} label={w} onRemove={() => toggleWeight(w)} />
            ))}
            {filters.colors.map((c) => (
              <FilterChip key={c} label={`Màu: ${c}`} onRemove={() => toggleColor(c)} />
            ))}
            {priceFiltered && (
              <FilterChip
                label={`${formatPrice(filters.priceRange[0])} - ${formatPrice(filters.priceRange[1])}`}
                onRemove={() => setPriceRange(DEFAULT_PRICE_RANGE)}
              />
            )}
          </div>
        </div>
      )}

      <FilterSection label="Chất liệu (Fiber)">
        {FIBER_OPTIONS.map((fiber) => (
          <CheckboxOption
            key={fiber}
            label={fiber}
            checked={filters.fibers.includes(fiber)}
            onChange={() => toggleFiber(fiber)}
          />
        ))}
      </FilterSection>

      <FilterSection label="Độ dày sợi (Weight)">
        {WEIGHT_OPTIONS.map((weight) => (
          <CheckboxOption
            key={weight}
            label={weight}
            checked={filters.weights.includes(weight)}
            onChange={() => toggleWeight(weight)}
          />
        ))}
      </FilterSection>

      <FilterSection label="Màu sắc tuyển chọn">
        {COLOR_OPTIONS.map((col) => {
          const checked = filters.colors.includes(col.name);
          return (
            <button
              key={col.name}
              onClick={() => toggleColor(col.name)}
              className="flex items-center justify-between w-full text-left py-1 text-xs text-ink-muted hover:text-ink transition-colors focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-border-custom/50 shadow-sm block"
                  style={{ backgroundColor: col.hex }}
                />
                <span className={checked ? "text-ink font-semibold" : ""}>{col.name}</span>
              </div>
              {checked && <span className="text-accent text-[10px] font-bold">✓</span>}
            </button>
          );
        })}
      </FilterSection>

      <FilterSection label="Khoảng giá (VND)" last contentClassName="space-y-4">
        
        <div className="grid grid-cols-2 gap-2">
          {QUICK_PRICE_RANGES.map(([min, max]) => {
            const active = filters.priceRange[0] === min && filters.priceRange[1] === max;
            return (
              <button
                key={`${min}-${max}`}
                onClick={() => setPriceRange([min, max])}
                className={`px-3 py-1.5 rounded-btn border text-[10px] font-medium text-center transition-all focus:outline-none cursor-pointer ${
                  active
                    ? "bg-accent text-surface border-accent"
                    : "bg-surface hover:bg-hover-fill text-ink-muted border-border-custom"
                }`}
              >
                {min / 1000}k - {max / 1000}k
              </button>
            );
          })}
        </div>

        
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-ink-muted uppercase">Min</span>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), filters.priceRange[1]])}
              className="w-full bg-surface border border-border-custom rounded-btn pl-8 pr-2 py-1.5 text-xs text-ink focus:outline-none focus:border-accent tabular-nums"
            />
          </div>
          <span className="text-ink-muted">—</span>
          <div className="relative flex-grow">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-ink-muted uppercase">Max</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => setPriceRange([filters.priceRange[0], Number(e.target.value)])}
              className="w-full bg-surface border border-border-custom rounded-btn pl-8 pr-2 py-1.5 text-xs text-ink focus:outline-none focus:border-accent tabular-nums"
            />
          </div>
        </div>
      </FilterSection>
    </div>
  );
}
