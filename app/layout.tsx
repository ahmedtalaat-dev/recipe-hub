import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { FavoritesProvider } from "@/lib/FavoritesContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeHub - Discover Amazing Recipes",
  description:
    "Explore thousands of recipes, save your favorites, and discover new culinary delights",

  icons: {
    icon: [
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.png",
  },

  // Open Graph (OG)
  openGraph: {
    title: "RecipeHub - Discover Amazing Recipes",
    description:
      "Explore thousands of recipes, save your favorites, and discover new culinary delights",
    url: "https://recipe-hub0.vercel.app/",
    siteName: "RecipeHub",
    images: [
      {
        url: "https://recipe-hub0.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "RecipeHub Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RecipeHub - Discover Amazing Recipes",
    description:
      "Explore thousands of recipes, save your favorites, and discover new culinary delights",
    images: ["https://recipe-hub0.vercel.app/og-image.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1410" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FavoritesProvider>
            <Navbar />
            {children}
            <Footer />
            {process.env.NODE_ENV === "production" && <Analytics />}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
