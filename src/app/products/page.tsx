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
    <div className="bg-[radial-gradient(900px_400px_at_15%_0%,rgba(246,195,67,0.30),transparent),radial-gradient(900px_420px_at_85%_5%,rgba(46,125,50,0.18),transparent)]">
      <Container className="py-14 sm:py-18">
        <PageHeading
          eyebrow="Products"
          title="Snacks for the whole family."
          description="Two lines, one promise: playful taste + real ingredients. Pick your vibe — lunchbox fun for kids or spice-kissed bars for grown-ups."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="jjb-card bg-white/70 p-8 ring-1 ring-black/5">
            <p className="inline-flex rounded-full bg-jjb-sun px-3 py-1 text-xs font-bold text-jjb-date">
              Kids Line
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-2xl tracking-tight">
              Little bars. Big smiles.
            </h2>
            <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
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
                  className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5"
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

          <div className="jjb-card bg-white/70 p-8 ring-1 ring-black/5">
            <p className="inline-flex rounded-full bg-jjb-leaf px-3 py-1 text-xs font-bold text-white">
              Family Line
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-2xl tracking-tight">
              A little bolder. Still joyful.
            </h2>
            <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
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
                  className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5"
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

        <div className="mt-10 jjb-card bg-white/70 p-8 ring-1 ring-black/5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="font-[var(--font-display)] text-2xl tracking-tight">
                Want Jogi Jam Bars at your café or shop?
              </p>
              <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
                We love checkout-counter displays, sampling moments, and
                family-friendly partnerships.
              </p>
            </div>
            <Button href="/cafe-partners" variant="secondary">
              Learn about partnerships
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}


