import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spotonportfolio.example"),
  title: {
    default: "Spot On Solutions | Portfolio",
    template: "%s | Spot On Solutions",
  },
  description:
    "Spot On Solutions creates premium branding, motion graphics, packaging, and digital design experiences for modern businesses.",
  applicationName: "Spot On Solutions Portfolio",
  keywords: [
    "graphic designer",
    "brand identity",
    "portfolio",
    "logo design",
    "packaging design",
    "social media design",
    "motion graphics",
  ],
  authors: [{ name: "Spot On Solutions" }],
  creator: "Spot On Solutions",
  publisher: "Spot On Solutions",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spot On Solutions | Portfolio",
    description:
      "Portfolio of branding, packaging, and digital design work by Spot On Solutions.",
    url: "https://spotonportfolio.example",
    siteName: "Spot On Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spot On Solutions | Portfolio",
    description:
      "Premium graphic design portfolio showcasing branding, packaging, social media, and digital creative work.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-[#0a0a0f] text-white"
      >
        {children}
      </body>
    </html>
  );
}
