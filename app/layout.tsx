import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HawariiDev | Portfolio",
  description:
    "Portfolio HawariiDev. Fullstack web developer dari Indonesia dengan fokus Next.js, TypeScript, dan produk web modern.",
  authors: [{ name: "Hawariii" }],
  keywords: ["HawariiDev", "Portfolio", "Next.js", "TypeScript", "Web Developer"],
  openGraph: {
    title: "HawariiDev | Portfolio",
    description:
      "Portfolio HawariiDev. Fullstack web developer dari Indonesia dengan fokus Next.js, TypeScript, dan produk web modern.",
    url: "https://hawarii.dev",
    siteName: "HawariiDev",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HawariiDev | Portfolio",
    description:
      "Portfolio HawariiDev. Fullstack web developer dari Indonesia dengan fokus Next.js, TypeScript, dan produk web modern.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
