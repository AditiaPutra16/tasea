import { Product, HeroSlide, CategoryCard } from "@/types";

export const BRAND_COLORS = {
  cream: "#F9EFE6",
  navy: "#17335B",
  slate: "#8DA8BB",
  sand: "#F0E3D6",
  darkNavy: "#0F223D",
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    tagline: "NEW HORIZONS 2026",
    title: "COLOR FOR DAILY LIFE",
    subtitle: "Siluet tas minimalis dengan sentuhan warna harmonis dan material pilihan untuk melengkapi setiap langkah Anda.",
    ctaText: "JELAJAHI KOLEKSI",
    ctaLink: "/collections/semua-produk",
    image: "/images/banner2.jpg",
    imageAlt: "Taséa Editorial Bag Collection",
    textColor: "dark",
  },
  {
    id: "slide-2",
    tagline: "SIGNATURE CRAFTSMANSHIP",
    title: "TIMELESS ELEGANCE",
    subtitle: "Keseimbangan sempurna antara estetika kontemporer dan fungsionalitas harian yang tahan lama.",
    ctaText: "LIHAT BESTSELLER",
    ctaLink: "/collections/semua-produk",
    image: "/images/banner1.jpg",
    imageAlt: "Taséa Classic Bag Design",
    textColor: "dark",
  },
];

export const CATEGORIES: CategoryCard[] = [
  {
    id: "cat-handbag",
    title: "HAND BAG",
    subtitle: "Structured & elegant carry",
    image: "/images/products/tas2.jpg",
    link: "/collections/semua-produk?category=HandBag",
  },
  {
    id: "cat-shoulderbag",
    title: "SHOULDER BAG",
    subtitle: "Timeless & effortless silhouette",
    image: "/images/products/tas1.jpg",
    link: "/collections/semua-produk?category=ShoulderBag",
  },
];

export const PRODUCTS: Product[] = [  
  {
    id: "tas-01",
    name: "Taséa Maréa",
    slug: "tasea-maréa",
    category: "Hand Bag",
    price: 1390000,
    originalPrice: 1590000,
    badge: "BESTSELLER",
    description: "Tas bahu ikonik Taséa berdesain ramping dengan proporsi ideal. Dibuat dengan material tahan percikan air, kompartemen terorganisir, dan tali bahu yang nyaman.",
    primaryImage: "/images/products/tas1.jpg",
    secondaryImage: "/images/products/tas2.jpg",
    dimensions: "26 x 14 x 7 cm",
    material: "Water-resistant Coated Canvas & Premium Trim",
    isBestseller: true,
    isNewArrival: false,
    colors: [
      { name: "Cream Ivory", hex: "#F9EFE6", border: true },
      { name: "Deep Navy", hex: "#17335B" },
      { name: "Slate Blue", hex: "#8DA8BB" },
      { name: "Warm Taupe", hex: "#B8A390" },
      { name: "Noir Black", hex: "#232323" },
    ],
  },
  {
    id: "tas-02",
    name: "Taséa Shéllora",
    slug: "tasea-shéllora",
    category: "Shoulder Bag",
    price: 1850000,
    badge: "NEW",
    description: "Tote serbaguna berkapasitas lega untuk laptop hingga 14 inch, buku catatan, dan botol minum. Sempurna untuk aktivitas profesional hingga weekend getaway.",
    primaryImage: "/images/products/tas2.jpg",
    secondaryImage: "/images/products/tas1.jpg",
    dimensions: "34 x 28 x 12 cm",
    material: "Reinforced Water-Repellent Fabric",
    isBestseller: false,
    isNewArrival: true,
    colors: [
      { name: "Deep Navy", hex: "#17335B" },
      { name: "Slate Blue", hex: "#8DA8BB" },
      { name: "Cream Ivory", hex: "#F9EFE6", border: true },
      { name: "Forest Olive", hex: "#5C6B59" },
    ],
  },
  {
    id: "tas-03",
    name: "Taséa Azuréa",
    slug: "tasea-azuréa",
    category: "Hand Bag",
    price: 1450000,
    badge: "BESTSELLER",
    description: "Desain flap penutup magnetik yang elegan dengan tali panjang yang dapat disesuaikan. Memberikan sentuhan effortless chic pada gaya kasual maupun formal.",
    primaryImage: "/images/products/tas1.jpg",
    secondaryImage: "/images/products/tas2.jpg",
    dimensions: "22 x 16 x 8 cm",
    material: "Sleek Matte Textured Leather & Metal Hardware",
    isBestseller: true,
    isNewArrival: false,
    colors: [
      { name: "Slate Blue", hex: "#8DA8BB" },
      { name: "Cream Ivory", hex: "#F9EFE6", border: true },
      { name: "Deep Navy", hex: "#17335B" },
      { name: "Terracotta Rose", hex: "#C47B6A" },
    ],
  },
  {
    id: "tas-04",
    name: "Taséa Seavé",
    slug: "tasea-seavé",
    category: "Shoulder Bag",
    price: 1620000,
    badge: "NEW",
    description: "Bentuk bulan sabit (crescent) lembut yang memeluk kontur tubuh dengan nyaman. Dilengkapi ritsleting halus dan kantong internal untuk ponsel dan kartu.",
    primaryImage: "/images/products/tas2.jpg",
    secondaryImage: "/images/products/tas1.jpg",
    dimensions: "30 x 20 x 9 cm",
    material: "Ultra-Lightweight Coated Material",
    isBestseller: false,
    isNewArrival: true,
    colors: [
      { name: "Cream Ivory", hex: "#F9EFE6", border: true },
      { name: "Deep Navy", hex: "#17335B" },
      { name: "Slate Blue", hex: "#8DA8BB" },
      { name: "Butter Sand", hex: "#EAD6BD" },
    ],
  },  
];

export const BRAND_VALUES = [
  {
    icon: "Truck",
    title: "Gratis Pengiriman",
    description: "Bebas ongkos kirim ke seluruh Indonesia untuk pesanan di atas Rp 1.000.000.",
  },
  {
    icon: "ShieldCheck",
    title: "100% Produk Orisinal",
    description: "Didesain dengan material premium tahan air dan pengerjaan presisi standar internasional.",
  },
  {
    icon: "Sparkles",
    title: "Garansi Perawatan",
    description: "Layanan purna jual dan garansi jahitan serta aksesori ritsleting selama 12 bulan.",
  },
  {
    icon: "MapPin",
    title: "Boutique Experience",
    description: "Kunjungi flagship store kami di Jakarta untuk melihat dan mencoba langsung koleksi Taséa.",
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    tag: "@clara.styles",
    caption: "Weekend stroll with my favorite Taséa Classic Baguette in Slate Blue.",
    image: "/images/products/tas1.jpg",
  },
  {
    id: "ig-2",
    tag: "@lifestyle.jakarta",
    caption: "The work bag that actually holds everything without looking bulky.",
    image: "/images/products/tas2.jpg",
  },
  {
    id: "ig-3",
    tag: "@taseaofficial",
    caption: "Harmoni warna #17335B & #F9EFE6 dalam sentuhan siluet modern.",
    image: "/images/banner1.jpg",
  },
  {
    id: "ig-4",
    tag: "@valerie.o",
    caption: "Effortless morning coffee companion. Beautiful colors, durable feel.",
    image: "/images/banner2.jpg",
  },
];
