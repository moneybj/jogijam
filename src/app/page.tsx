import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Honest-style hero: image-led with a clean overlay */}
      <Container className="py-8 sm:py-10">
        <div className="relative min-h-[440px] overflow-hidden rounded-[28px] border border-black/10 bg-jjb-surface bg-[url('/images/Jogibaringredient.svg')] bg-cover bg-center bg-no-repeat sm:min-h-[520px]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(255,255,255,0.84),rgba(255,255,255,0.18))] md:bg-[linear-gradient(90deg,rgba(255,255,255,0.94),rgba(255,255,255,0.72),rgba(255,255,255,0.10))]" />

          <div className="absolute inset-0 flex items-center">
            <div className="pointer-events-auto w-full p-7 sm:p-10 md:max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Organic • Date-based • Ayurveda-inspired
              </p>
              <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-tight sm:text-5xl">
                Protecting snack time’s happy place.
              </h1>
              <p className="mt-4 text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
                Whole-food bars made from dates, fruits, nuts/seeds, and gentle
                spices — made to taste like a treat and feel like a good choice.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/products">Shop now</Button>
                <Button href="/our-story" variant="secondary">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Honest-like product grid section */}
      <Container className="py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
              Best sellers
            </p>
            <p className="mt-2 font-[var(--font-display)] text-2xl tracking-tight">
              Family favorites, date-sweetened.
            </p>
          </div>
          <Button href="/products" variant="secondary" className="hidden sm:flex">
            Shop all
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Strawberry Jammin’", img: "/illustrations/wrapper-kids.svg" },
            { title: "Cocoa Loco", img: "/illustrations/wrapper-kids.svg" },
            { title: "Golden Chai Bliss", img: "/illustrations/wrapper-family.svg" },
            { title: "Mocha Morning", img: "/illustrations/wrapper-family.svg" },
          ].map((p) => (
            <div
              key={p.title}
              className="overflow-hidden rounded-[22px] border border-black/10 bg-white"
            >
              <div className="bg-jjb-surface p-4">
                <Image
                  src={p.img}
                  alt={p.title}
                  width={960}
                  height={640}
                  className="h-auto w-full"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
                  Date-sweetened • Whole foods
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Honest-like standard band */}
      <div className="border-y border-black/10 bg-jjb-surface">
        <Container className="py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
            The Jogi standard
          </p>
          <div className="mt-3 grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="font-[var(--font-display)] text-2xl tracking-tight">
                Transparent ingredients. Thoughtful joy.
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/80">
                We keep it honest and family-friendly: clear ingredient callouts,
                playful flavors, and no exaggerated health claims.
              </p>
            </div>
            {[
              "Whole-food formulas",
              "Kids + parents approved",
              "Ayurveda-inspired flavors",
            ].map((t) => (
              <div key={t} className="rounded-[18px] border border-black/10 bg-white p-5">
                <p className="text-sm font-semibold">{t}</p>
                <p className="mt-2 text-sm text-foreground/70">
                  Built for everyday snack moments.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
