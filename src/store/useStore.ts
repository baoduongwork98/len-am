import { create } from "zustand";

export interface YarnColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  fiber: "Merino" | "Alpaca" | "Silk" | "Cotton" | "Linen";
  fiberDetail: string;
  weight: "Fingering" | "Sport" | "DK" | "Worsted" | "Chunky";
  yardage: string;
  weightGrams: string;
  price: number; 
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
  colors: YarnColor[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: YarnColor;
  quantity: number;
}

export interface WorkshopRegistration {
  name: string;
  phone: string;
  session: string;
  registeredAt: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface FilterState {
  fibers: string[];
  weights: string[];
  colors: string[];
  priceRange: [number, number]; 
  sortBy: string;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  filters: FilterState;
  workshopRegistrations: WorkshopRegistration[];
  toasts: ToastMessage[];
  
  
  addToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
  
  
  addToCart: (product: Product, color: YarnColor) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, colorHex: string, qty: number) => void;

  
  toggleFiber: (fiber: string) => void;
  toggleWeight: (weight: string) => void;
  toggleColor: (colorName: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;

  
  registerWorkshop: (registration: Omit<WorkshopRegistration, "registeredAt">) => void;
  cancelWorkshop: (index: number) => void;
  loadWorkshopRegistrations: () => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sương Sớm - Merino Silk Blend",
    fiber: "Merino",
    fiberDetail: "75% Extra Fine Merino, 25% Mulberry Silk",
    weight: "Fingering",
    yardage: "400m / 437 yds",
    weightGrams: "100g",
    price: 480000,
    stock: 15,
    rating: 4.9,
    reviewsCount: 32,
    description: "Sự kết hợp tinh tế giữa len lông cừu Merino siêu mềm mịn và lụa tơ tằm Mulberry óng ả. Phù hợp cho các sản phẩm cao cấp, khăn choàng mỏng nhẹ hoặc áo len đan tay thu đông.",
    featured: true,
    colors: [
      { name: "Oat Milk", hex: "#EAE2D6", image: "/product-merino.png" },
      { name: "Sage", hex: "#93A382", image: "/product-wool.png" },
      { name: "Terracotta", hex: "#C17A56", image: "/product-cotton.png" }
    ]
  },
  {
    id: "2",
    name: "Mây Ấm - Baby Alpaca Cloud",
    fiber: "Alpaca",
    fiberDetail: "80% Baby Alpaca, 20% Organic Merino",
    weight: "DK",
    yardage: "220m / 240 yds",
    weightGrams: "50g",
    price: 360000,
    stock: 8,
    rating: 4.8,
    reviewsCount: 24,
    description: "Sợi Alpaca tơ hảo hạng mang lại độ phồng xốp tối đa và khả năng giữ ấm vượt trội gấp 3 lần len thường. Thích hợp đan áo khoác ngoài, nón len hay những chiếc khăn ấm áp nhất.",
    featured: true,
    colors: [
      { name: "Terracotta", hex: "#C17A56", image: "/product-cotton.png" },
      { name: "Oat Milk", hex: "#EAE2D6", image: "/product-merino.png" },
      { name: "Sage", hex: "#93A382", image: "/product-wool.png" }
    ]
  },
  {
    id: "3",
    name: "Cỏ May - Organic Cotton Soft",
    fiber: "Cotton",
    fiberDetail: "100% Organic Egyptian Cotton",
    weight: "Sport",
    yardage: "180m / 196 yds",
    weightGrams: "50g",
    price: 180000,
    stock: 25,
    rating: 4.7,
    reviewsCount: 18,
    description: "Sợi cotton hữu cơ trồng tại thung lũng sông Nile, dệt chải kỹ mang lại độ mềm mại tuyệt đối và không kích ứng da. Lựa chọn lý tưởng cho da nhạy cảm và trang phục mùa hè mát mẻ.",
    featured: false,
    colors: [
      { name: "Sage", hex: "#93A382", image: "/product-wool.png" },
      { name: "Oat Milk", hex: "#EAE2D6", image: "/product-merino.png" },
      { name: "Terracotta", hex: "#C17A56", image: "/product-cotton.png" }
    ]
  },
  {
    id: "4",
    name: "Nắng Hạ - Pure Linen Breeze",
    fiber: "Linen",
    fiberDetail: "100% Traceable Belgian Flax",
    weight: "Sport",
    yardage: "260m / 284 yds",
    weightGrams: "100g",
    price: 520000,
    stock: 5,
    rating: 4.6,
    reviewsCount: 14,
    description: "Sợi đũi tự nhiên cao cấp nhập khẩu từ Bỉ, mát mẻ và thấm hút mồ hôi tốt. Càng giặt sợi càng mềm mại và có độ rũ đặc trưng tuyệt đẹp cho dáng áo hè phóng khoáng.",
    featured: false,
    colors: [
      { name: "Oat Milk", hex: "#EAE2D6", image: "/product-merino.png" },
      { name: "Sage", hex: "#93A382", image: "/product-wool.png" }
    ]
  },
  {
    id: "5",
    name: "Chiều Hôm - Classic Worsted Merino",
    fiber: "Merino",
    fiberDetail: "100% Extra Fine Merino Wool",
    weight: "Worsted",
    yardage: "200m / 218 yds",
    weightGrams: "100g",
    price: 420000,
    stock: 19,
    rating: 5.0,
    reviewsCount: 45,
    description: "Sợi Merino cổ điển dệt chặt với cấu trúc xốp tròn, độ đàn hồi cực tốt, giữ form dáng hoàn hảo cho các họa tiết vặn thừng và đan nổi.",
    featured: true,
    colors: [
      { name: "Sage", hex: "#93A382", image: "/product-wool.png" },
      { name: "Terracotta", hex: "#C17A56", image: "/product-cotton.png" },
      { name: "Oat Milk", hex: "#EAE2D6", image: "/product-merino.png" }
    ]
  },
  {
    id: "6",
    name: "Bình Minh - Alpaca Bulky",
    fiber: "Alpaca",
    fiberDetail: "70% Baby Alpaca, 30% Fine Merino Wool",
    weight: "Chunky",
    yardage: "90m / 98 yds",
    weightGrams: "100g",
    price: 390000,
    stock: 11,
    rating: 4.8,
    reviewsCount: 9,
    description: "Sợi len size to béo ấm áp, giúp dự án của bạn hoàn thành nhanh chóng chỉ trong vài giờ. Thích hợp đan áo len chunky oversize hoặc chăn đắp ấm cúng.",
    featured: false,
    colors: [
      { name: "Terracotta", hex: "#C17A56", image: "/product-cotton.png" },
      { name: "Oat Milk", hex: "#EAE2D6", image: "/product-merino.png" }
    ]
  }
];

const INITIAL_FILTERS: FilterState = {
  fibers: [],
  weights: [],
  colors: [],
  priceRange: [100000, 600000],
  sortBy: "featured"
};

export const useStore = create<StoreState>((set) => ({
  products: INITIAL_PRODUCTS,
  cart: [],
  filters: INITIAL_FILTERS,
  workshopRegistrations: [],
  toasts: [],
  
  
  addToast: (message, type = "success") => set((state) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type
    };
    return { toasts: [...state.toasts, newToast] };
  }),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),
  
  
  addToCart: (product, color) => set((state) => {
    const exists = state.cart.some(
      (item) => item.product.id === product.id && item.selectedColor.hex === color.hex
    );

    if (exists) {
      return {
        cart: state.cart.map((item) =>
          item.product.id === product.id && item.selectedColor.hex === color.hex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }

    return {
      cart: [...state.cart, { product, selectedColor: color, quantity: 1 }]
    };
  }),
  
  removeFromCart: (productId, colorHex) => set((state) => ({
    cart: state.cart.filter(
      (item) => !(item.product.id === productId && item.selectedColor.hex === colorHex)
    )
  })),
  
  updateCartQuantity: (productId, colorHex, qty) => set((state) => ({
    cart: state.cart.map((item) => 
      item.product.id === productId && item.selectedColor.hex === colorHex
        ? { ...item, quantity: Math.max(1, qty) }
        : item
    )
  })),
  
  
  toggleFiber: (fiber) => set((state) => {
    const fibers = state.filters.fibers.includes(fiber)
      ? state.filters.fibers.filter((f) => f !== fiber)
      : [...state.filters.fibers, fiber];
    return { filters: { ...state.filters, fibers } };
  }),
  
  toggleWeight: (weight) => set((state) => {
    const weights = state.filters.weights.includes(weight)
      ? state.filters.weights.filter((w) => w !== weight)
      : [...state.filters.weights, weight];
    return { filters: { ...state.filters, weights } };
  }),
  
  toggleColor: (colorName) => set((state) => {
    const colors = state.filters.colors.includes(colorName)
      ? state.filters.colors.filter((c) => c !== colorName)
      : [...state.filters.colors, colorName];
    return { filters: { ...state.filters, colors } };
  }),
  
  setPriceRange: (range) => set((state) => ({
    filters: { ...state.filters, priceRange: range }
  })),
  
  setSortBy: (sort) => set((state) => ({
    filters: { ...state.filters, sortBy: sort }
  })),
  
  resetFilters: () => set({ filters: INITIAL_FILTERS }),

  
  registerWorkshop: (registration) => set((state) => {
    const newReg: WorkshopRegistration = {
      ...registration,
      registeredAt: new Date().toISOString()
    };
    const updated = [...state.workshopRegistrations, newReg];
    if (typeof window !== "undefined") {
      localStorage.setItem("workshop_registrations", JSON.stringify(updated));
    }
    return { workshopRegistrations: updated };
  }),
  
  cancelWorkshop: (index) => set((state) => {
    const updated = state.workshopRegistrations.filter((_, i) => i !== index);
    if (typeof window !== "undefined") {
      localStorage.setItem("workshop_registrations", JSON.stringify(updated));
    }
    return { workshopRegistrations: updated };
  }),
  
  loadWorkshopRegistrations: () => set(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("workshop_registrations");
      if (saved) {
        try {
          return { workshopRegistrations: JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse workshop registrations", e);
        }
      }
    }
    return {};
  })
}));
