import { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalog } from "@/components/shop/shop-catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "",
  icons: {
    icon: [
      { url: "/icon.jpg", type: "image/jpeg" },
      { url: "/images/logos/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },  
};

function ShopCatalogSkeleton() {
  return (
    <div className="w-full bg-[#F9EFE6] min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      <div className="h-4 w-36 bg-[#17335B]/10 rounded mb-8" />
      <div className="h-10 w-64 bg-[#17335B]/10 rounded mx-auto mb-4" />
      <div className="h-4 w-96 bg-[#17335B]/10 rounded mx-auto mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-3/4 bg-[#17335B]/10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopCatalogSkeleton />}>
      <ShopCatalog />
    </Suspense>
  );
}
