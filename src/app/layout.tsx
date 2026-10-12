import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MP DREAM EVENTS & Solutions | Premier Event & Stall Management Chennai",
  description:
    "Chennai's premier event management company specializing in grand celebrations, luxury wedding decor, apartment flea market expos, stall bookings, and business tax accounting.",
  icons: {
    icon: [
      { url: "/images/mp-logo.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: "/images/mp-logo.png?v=2",
    apple: "/images/mp-logo.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}>
      <body className="font-sans min-h-full flex flex-col bg-black text-slate-100 selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
