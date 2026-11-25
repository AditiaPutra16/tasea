export interface ColorOption {
  name: string;
  hex: string;
  border?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Hand Bag" | "Shoulder Bag";
  price: number;
  originalPrice?: number;
  badge?: "BESTSELLER" | "NEW" | "LIMITED";
  description: string;
  primaryImage: string;
  secondaryImage: string;
  images?: string[];
  colors: ColorOption[];
  dimensions?: string;
  material?: string;
  features?: string[];
  weight?: string;
  handleDrop?: string;
  strapLength?: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorOption;
  quantity: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  textColor?: "dark" | "light";
}

export interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}
