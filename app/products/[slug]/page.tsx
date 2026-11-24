import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { ProductDetail } from "@/components/product/product-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export const metadata: Metadata = {
  title: "Detail Product",
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

async function ProductContent({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9EFE6] animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="h-4 w-48 bg-[#17335B]/10 rounded" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Gallery Skeleton */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="hidden md:flex flex-col gap-3 w-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-4/5 w-20 bg-[#17335B]/10 rounded-lg" />
              ))}
            </div>
            <div className="flex-1 aspect-4/5 bg-[#17335B]/10 rounded-2xl" />
          </div>

          {/* Info Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="h-4 w-24 bg-[#17335B]/10 rounded" />
            <div className="h-8 w-3/4 bg-[#17335B]/10 rounded" />
            <div className="h-6 w-1/3 bg-[#17335B]/10 rounded" />
            <div className="h-10 w-full bg-[#17335B]/10 rounded-xl" />
            <div className="h-14 w-full bg-[#17335B]/10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
