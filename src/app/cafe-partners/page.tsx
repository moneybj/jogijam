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
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Café Partners"
          title="A perfect grab‑and‑go snack next to the espresso machine."
          description="Jogi Jam Bars are designed for checkout counters and displays — a premium, family-friendly snack that pairs beautifully with coffee, chai, smoothies, and busy mornings."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[22px] border border-black/10 bg-white p-7 lg:col-span-2">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              How we show up in your shop
            </p>
            <ul className="mt-5 space-y-4 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
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

          <div className="rounded-[22px] border border-black/10 bg-white p-7">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              Quick pitch
            </p>
            <p className="mt-3 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
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

        <div className="mt-10 rounded-[22px] border border-black/10 bg-jjb-surface p-8">
          <p className="font-[var(--font-display)] text-2xl tracking-tight">
            Want a co-branded promo?
          </p>
          <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
            We can support with table tents, chalkboard-style signage, loyalty
            rewards, and social shoutouts — keeping the message warm, honest,
            and fun.
          </p>
        </div>
      </Container>
    </div>
  );
}


