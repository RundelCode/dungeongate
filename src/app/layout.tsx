import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import "./globals.css";

const bjorke = localFont({
  src: [
    {
      path: './fonts/The-Bjorke.ttf',
    },
  ],
  variable: '--font-bjorke',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dungeon Gate",
  description: "Plataforma para crear partidas de Dungeons and Dragons de manera rapida e intuitiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bjorke.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
