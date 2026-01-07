import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/Button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Jogi Jam Bars product lines for kids and grown-ups — playful flavors made from organic, whole-food ingredients.",
};

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Products"
          title="Snacks for the whole family."
          description="Two lines, one promise: playful taste + real ingredients. Pick your vibe — lunchbox fun for kids or spice-kissed bars for grown-ups."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
            <div className="border-b border-black/10 bg-jjb-surface px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Kids line
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl tracking-tight">
                Little bars. Big smiles.
              </h2>
            </div>
            <div className="p-8">
            <p className="text-base leading-7 text-foreground/80 sm:text-sm sm:leading-6 sm:text-foreground/70">
              Smaller portions, familiar flavors, and fun names. Built for
              lunchboxes, after-school, and “one more bite!”
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl bg-white/70 ring-1 ring-black/5">
              <Image
                src="/illustrations/wrapper-kids.svg"
                alt="Kids line wrapper mockup"
                width={960}
                height={640}
                className="h-auto w-full"
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Strawberry Jammin’", note: "Date + strawberry vibes" },
                { name: "Cocoa Loco", note: "Chocolatey chew, date sweet" },
                { name: "Mighty Mango", note: "Tropical mango + coconut" },
                {
                  name: "Banana Monkey Madness",
                  note: "PB-banana style favorite",
                },
              ].map((f) => (
                <div
                  key={f.name}
                  className="rounded-[18px] border border-black/10 bg-white p-4"
                >
                  <p className="font-semibold">{f.name}</p>
                  <p className="mt-1 text-sm text-foreground/80 sm:text-xs sm:text-foreground/70">
                    {f.note}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-foreground/75 sm:text-xs sm:text-foreground/60">
              Note: final recipes, allergens, and nutrition facts will be listed
              clearly per flavor.
            </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
            <div className="border-b border-black/10 bg-jjb-surface px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Family line
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl tracking-tight">
                A little bolder. Still joyful.
              </h2>
            </div>
            <div className="p-8">
            <p className="text-base leading-7 text-foreground/80 sm:text-sm sm:leading-6 sm:text-foreground/70">
              Heartier bars with adventurous flavor notes — inspired by cozy
              spices and Ayurvedic traditions (in a friendly, no-lectures way).
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl bg-white/70 ring-1 ring-black/5">
              <Image
                src="/illustrations/wrapper-family.svg"
                alt="Family line wrapper mockup"
                width={960}
                height={640}
                className="h-auto w-full"
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Golden Chai Bliss", note: "Turmeric + chai warmth" },
                { name: "Mocha Morning", note: "Coffee + cacao crunch" },
                { name: "Cardamom Crunch", note: "Sweet spice + nuts/seeds" },
                { name: "Fig & Walnut Fiesta", note: "Rich, fruity, toasty" },
              ].map((f) => (
                <div
                  key={f.name}
                  className="rounded-[18px] border border-black/10 bg-white p-4"
                >
                  <p className="font-semibold">{f.name}</p>
                  <p className="mt-1 text-sm text-foreground/80 sm:text-xs sm:text-foreground/70">
                    {f.note}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-foreground/75 sm:text-xs sm:text-foreground/60">
              We’ll never make medical claims — we focus on real ingredients and
              honest labeling.
            </p>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[22px] border border-black/10 bg-jjb-surface">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="px-8 pt-8 font-[var(--font-display)] text-2xl tracking-tight">
                Want Jogi Jam Bars at your café or shop?
              </p>
              <p className="mt-2 px-8 pb-8 text-base leading-7 text-foreground/80 sm:text-sm sm:leading-6 sm:text-foreground/70">
                We love checkout-counter displays, sampling moments, and
                family-friendly partnerships.
              </p>
            </div>
            <div className="px-8 pb-8 md:py-8">
              <Button href="/cafe-partners" variant="secondary">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


