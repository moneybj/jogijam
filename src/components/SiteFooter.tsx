import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/40">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <BrandMark withTagline />
            <p className="mt-4 text-sm leading-6 text-foreground/70">
              Organic date-based snack bars inspired by Ayurveda — made to feel
              like a treat, built from real whole foods.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div className="space-y-3">
              <p className="font-[var(--font-display)] text-base">Explore</p>
              <ul className="space-y-2 text-foreground/75">
                <li>
                  <Link href="/products" className="hover:text-foreground">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="hover:text-foreground">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/cafe-partners" className="hover:text-foreground">
                    Café Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-[var(--font-display)] text-base">Support</p>
              <ul className="space-y-2 text-foreground/75">
                <li>
                  <Link href="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-[var(--font-display)] text-base">Say hi</p>
              <ul className="space-y-2 text-foreground/75">
                <li>
                  <a
                    href="mailto:hello@jogijambars.com"
                    className="hover:text-foreground"
                  >
                    hello@jogijambars.com
                  </a>
                </li>
                <li className="text-foreground/60">
                  Instagram / TikTok coming soon
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jogi Jam Bars. All rights reserved.</p>
          <p>Made with whole foods, bright colors, and good vibes.</p>
        </div>
      </Container>
    </footer>
  );
}


