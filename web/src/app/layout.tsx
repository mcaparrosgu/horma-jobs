import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Horma · ingesta",
  description: "Ofertas, fuentes y ejecuciones de ingesta de Horma",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <nav className="flex gap-6 border-b border-zinc-200 bg-white px-6 py-3 text-sm font-medium">
          <span className="font-semibold">Horma · ingesta</span>
          <Link href="/ofertas">Ofertas</Link>
          <Link href="/fuentes">Fuentes</Link>
          <Link href="/ejecuciones">Ejecuciones</Link>
          <Link href="/candidatos">Candidatas</Link>
        </nav>
        <main className="mx-auto w-full max-w-6xl flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
