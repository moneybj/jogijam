import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Café Partners",
  description:
    "Partner with Jogi Jam Bars for cafés, coffee shops, tea houses, and juice bars — a joyful, whole-food snack at checkout.",
};

export default function CafePartnersPage() {
  return (
    <div className="bg-[radial-gradient(1000px_420px_at_20%_0%,rgba(56,189,248,0.18),transparent),radial-gradient(900px_420px_at_90%_5%,rgba(246,195,67,0.22),transparent)]">
      <Container className="py-14 sm:py-18">
        <PageHeading
          eyebrow="Café Partners"
          title="A perfect grab‑and‑go snack next to the espresso machine."
          description="Jogi Jam Bars are designed for checkout counters and displays — a premium, family-friendly snack that pairs beautifully with coffee, chai, smoothies, and busy mornings."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="jjb-card bg-white/70 p-7 ring-1 ring-black/5 lg:col-span-2">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              How we show up in your shop
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-foreground/75">
              <li>
                <span className="font-semibold text-foreground">
                  Checkout display:
                </span>{" "}
                a small, bright stand that makes impulse buys feel wholesome.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Pairing moments:
                </span>{" "}
                “Coffee + bar” morning bundles, or a “Chai &amp; Jogi” feature.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Sampling days:
                </span>{" "}
                easy bite-size samples to drive trial and repeat purchases.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Family-friendly:
                </span>{" "}
                great for cafés near parks, studios, and kid-heavy neighborhoods.
              </li>
            </ul>
          </div>

          <div className="jjb-card bg-white/70 p-7 ring-1 ring-black/5">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              Quick pitch
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/75">
              “A joyfully branded, whole-food snack bar — sweetened with dates,
              inspired by Ayurveda, and easy to love.”
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/contact">Become a partner</Button>
              <Button href="/products" variant="secondary">
                See the lineup
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 jjb-card bg-white/70 p-8 ring-1 ring-black/5">
          <p className="font-[var(--font-display)] text-2xl tracking-tight">
            Want a co-branded promo?
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground/75">
            We can support with table tents, chalkboard-style signage, loyalty
            rewards, and social shoutouts — keeping the message warm, honest,
            and fun.
          </p>
        </div>
      </Container>
    </div>
  );
}


