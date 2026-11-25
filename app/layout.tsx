import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import { Footer } from "@/components/layout/footer";
import { ChatButton } from "@/components/layout/chat-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#17335B",
};

export const metadata: Metadata = {
  title: "Home",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-clip max-w-full`}
    >
      <body className="min-h-full flex flex-col bg-[#F9EFE6] text-[#17335B] overflow-x-clip w-full max-w-full relative touch-pan-y">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <ChatButton />
        </CartProvider>
      </body>
    </html>
  );
}
