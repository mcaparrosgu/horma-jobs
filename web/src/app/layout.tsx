import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Nav } from "./nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horma · panel",
  description: "Panel de Horma: pipelines, ingesta y datos guardados",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <Suspense fallback={<nav className="border-b border-zinc-200 bg-white px-6 py-3 text-sm font-semibold">Horma</nav>}><Nav /></Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
