import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { inter, spaceGrotesk } from "@/configs/fonts";
import Providers from "@/providers/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aave Umbrella",
  description: "Stake your Aave positions and earn extra yield",
  openGraph: {
    title: "Aave Umbrella",
    description: "Stake your Aave positions and earn extra yield",
    url: "https://stake.onaave.com",
    siteName: "Aave Umbrella",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aave Umbrella",
    description: "Stake your Aave positions and earn extra yield",
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        )}
      </head>
      <body
        className={`font-sans ${inter.variable} ${spaceGrotesk.variable} border-main-950 dark:border-main-500 text-main-950 dark:bg-main-950 antialiased dark:text-white`}
      >
        <Providers>
          <div className="Root flex min-h-screen flex-col justify-between sm:px-7">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
