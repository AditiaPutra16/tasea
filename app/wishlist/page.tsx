import { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist | Taséa",
  description: "Daftar koleksi produk impian Taséa yang Anda simpan.",
  icons: {
    icon: [
      { url: "/icon.jpg", type: "image/jpeg" },
      { url: "/images/logos/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },
};

export default function WishlistPage() {
  return <WishlistView />;
}
