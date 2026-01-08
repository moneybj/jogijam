import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/shop", label: "Shop" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/our-story", label: "Our Story" },
  { href: "/cafe-partners", label: "Café Partners" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <BrandMark />

        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="secondary" className="hidden sm:flex">
            Contact
          </Button>
          <Button href="/shop">Shop</Button>
        </div>
      </Container>
    </header>
  );
}


