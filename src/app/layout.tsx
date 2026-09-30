import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./dkr-theme.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ShaadiSet — Pakistan's Wedding Vendor Marketplace",
  description:
    "Browse, compare & book Pakistan's best wedding vendors — photographers, decorators, caterers, makeup artists, venues & more. Lahore · Karachi · Islamabad · Faisalabad.",
  keywords: [
    "wedding vendors Pakistan",
    "wedding photographer Lahore",
    "wedding decorator Karachi",
    "caterers Islamabad",
    "bridal makeup",
    "shaadi",
    "ShaadiSet",
  ],
  authors: [{ name: "ShaadiSet" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "ShaadiSet — Pakistan's Wedding Vendor Marketplace",
    description:
      "Ek platform jahan aap apni shaadi ke liye saare vendors ek jagah browse, compare aur book kar saken.",
    siteName: "ShaadiSet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShaadiSet — Pakistan's Wedding Vendor Marketplace",
    description:
      "Browse, compare & book Pakistan's best wedding vendors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
