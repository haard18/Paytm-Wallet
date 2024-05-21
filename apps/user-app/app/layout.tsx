import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { AppBarClient } from "../components/Appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paytm From Scratch",
  description: "A Paytm clone built with Next.js ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
        <AppBarClient/>
          {children}
          </body>
      </Providers>
    </html>
  );
}
