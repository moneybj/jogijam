import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { ReactNode } from "react";
import Script from "next/script";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
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
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3005"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jogi Jam Bars",
    description:
      "Playfully nourishing, organic date-based snack bars inspired by Ayurveda.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jogi Jam Bars",
    description:
      "Organic date-based snack bars inspired by Ayurveda — playfully nourishing snacks kids love and parents trust.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
      >
        {ga4 ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <AnalyticsBeacon />
        <div className="min-h-dvh">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
