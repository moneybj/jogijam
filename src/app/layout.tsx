import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { ReactNode } from "react";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jogi Jam Bars",
    template: "%s | Jogi Jam Bars",
  },
  description:
    "Organic date-based snack bars inspired by Ayurveda — playfully nourishing snacks kids love and parents trust.",
  applicationName: "Jogi Jam Bars",
  openGraph: {
    title: "Jogi Jam Bars",
    description:
      "Playfully nourishing, organic date-based snack bars inspired by Ayurveda.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${fredoka.variable} antialiased`}
      >
        <div className="min-h-dvh">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
