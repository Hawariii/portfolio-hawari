import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hawari — Web Developer & Minecraft Addon Creator",
  description:
    "Portfolio Hawari, programmer asal Indonesia yang fokus di web development dan aktif bikin addon & texture pack Minecraft Bedrock.",
  keywords: [
    "Hawari",
    "Web Developer",
    "Indonesia",
    "Next.js",
    "Laravel",
    "Minecraft Bedrock",
    "Addon Creator",
  ],
  authors: [{ name: "Hawari" }],
  openGraph: {
    title: "Hawari — Web Developer & Minecraft Addon Creator",
    description:
      "Portfolio Hawari, programmer asal Indonesia yang fokus di web development dan aktif bikin addon & texture pack Minecraft Bedrock.",
    url: "https://hawari.dev",
    siteName: "Hawari Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawari — Web Developer & Minecraft Addon Creator",
    description:
      "Portfolio Hawari, programmer asal Indonesia yang fokus di web development dan aktif bikin addon & texture pack Minecraft Bedrock.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}