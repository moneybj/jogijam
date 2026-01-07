import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[radial-gradient(1200px_500px_at_20%_0%,rgba(246,195,67,0.35),transparent),radial-gradient(900px_400px_at_85%_10%,rgba(216,27,96,0.22),transparent)]">
      <Container className="py-14 sm:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-foreground/80 ring-1 ring-black/5">
              Organic • Date‑based • Ayurveda‑inspired
            </p>
            <h1 className="mt-5 font-[var(--font-display)] text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Jam‑packed with joy.
              <span className="text-jjb-berry"> Built from whole foods.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/90 sm:text-foreground/75">
              Jogi Jam Bars are playfully nourishing snack bars made with dates,
              nuts, fruits, and gentle spices — the sweet, chewy treat kids love
              and parents trust.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/products">Explore flavors</Button>
              <Button href="/our-story" variant="secondary">
                Meet Jogi
              </Button>
            </div>

            <p className="mt-6 text-sm text-foreground/75 sm:text-foreground/60">
              No heavy health lectures. Just real ingredients, made with love.
            </p>
          </div>

          <div className="jjb-card relative overflow-hidden bg-white/70 ring-1 ring-black/5">
            <div className="absolute inset-0 bg-[radial-gradient(700px_260px_at_30%_10%,rgba(46,125,50,0.18),transparent),radial-gradient(650px_300px_at_80%_20%,rgba(56,189,248,0.18),transparent)]" />
            <div className="relative p-8 sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-[var(--font-display)] text-2xl tracking-tight">
                    What’s inside?
                  </p>
                  <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
                    A short list you can pronounce — like dates, nuts/seeds,
                    fruit, and cozy spices.
                  </p>
                </div>
                <span className="rounded-full bg-jjb-sun px-3 py-1 text-xs font-bold text-jjb-date">
                  Whole‑food sweet
                </span>
              </div>

              <div className="mt-7 overflow-hidden rounded-3xl bg-white/70 ring-1 ring-black/5">
                <Image
                  src="/illustrations/ingredients-doodles.svg"
                  alt="Playful doodles of dates, nuts, fruits, and spices"
                  width={1200}
                  height={360}
                  className="h-auto w-full"
                  priority
                />
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5">
                  <p className="font-semibold">Kids say “YUM.”</p>
                  <p className="mt-1 text-base text-foreground/85 sm:text-sm sm:text-foreground/70">
                    Familiar flavors, fun names, lunchbox‑friendly.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5">
                  <p className="font-semibold">Parents say “YES.”</p>
                  <p className="mt-1 text-base text-foreground/85 sm:text-sm sm:text-foreground/70">
                    Organic ingredients, clear labeling, no hype.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5">
                  <p className="font-semibold">Ayurveda‑inspired.</p>
                  <p className="mt-1 text-base text-foreground/85 sm:text-sm sm:text-foreground/70">
                    Gentle spices like cardamom, cinnamon, turmeric.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-black/5">
                  <p className="font-semibold">Made for togetherness.</p>
                  <p className="mt-1 text-base text-foreground/85 sm:text-sm sm:text-foreground/70">
                    A snack that makes family moments easier (and happier).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <div className="jjb-card overflow-hidden bg-white/70 ring-1 ring-black/5">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="font-[var(--font-display)] text-3xl tracking-tight">
                Two lines, one family vibe.
              </p>
              <p className="mt-3 text-foreground/85 sm:text-foreground/75">
                Kid‑friendly favorites for little adventurers, plus bolder,
                spice‑kissed bars for grown‑ups (and hungry teens).
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/products">See all products</Button>
                <Button href="/cafe-partners" variant="secondary">
                  For cafés &amp; shops
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(246,195,67,0.35),rgba(56,189,248,0.18))] p-6 ring-1 ring-black/5">
                <p className="font-[var(--font-display)] text-xl">Kids Line</p>
                <p className="mt-2 text-base text-foreground/85 sm:text-sm sm:text-foreground/70">
                  Smaller, playful, lunchbox‑ready.
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/70 ring-1 ring-black/5">
                  <Image
                    src="/illustrations/wrapper-kids.svg"
                    alt="Playful kids line wrapper mockup"
                    width={960}
                    height={640}
                    className="h-auto w-full"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  <li>Strawberry Jammin’</li>
                  <li>Cocoa Loco</li>
                  <li>Mighty Mango</li>
                  <li>Banana Monkey Madness</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(46,125,50,0.20),rgba(216,27,96,0.18))] p-6 ring-1 ring-black/5">
                <p className="font-[var(--font-display)] text-xl">Family Line</p>
                <p className="mt-2 text-base text-foreground/85 sm:text-sm sm:text-foreground/70">
                  Heartier bars with grown‑up flavor twists.
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl bg-white/70 ring-1 ring-black/5">
                  <Image
                    src="/illustrations/wrapper-family.svg"
                    alt="Modern family line wrapper mockup"
                    width={960}
                    height={640}
                    className="h-auto w-full"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  <li>Golden Chai Bliss</li>
                  <li>Mocha Morning</li>
                  <li>Cardamom Crunch</li>
                  <li>Fig &amp; Walnut Fiesta</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="jjb-card bg-white/70 p-7 ring-1 ring-black/5">
            <p className="font-[var(--font-display)] text-xl">Real ingredients</p>
            <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
              Dates for natural sweetness, plus nuts/seeds, fruits, and gentle
              spices. Nothing “weird.”
            </p>
          </div>
          <div className="jjb-card bg-white/70 p-7 ring-1 ring-black/5">
            <p className="font-[var(--font-display)] text-xl">
              Playfully trustworthy
            </p>
            <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
              Bright, joyful branding — backed by transparent, parent‑friendly
              labeling.
            </p>
          </div>
          <div className="jjb-card bg-white/70 p-7 ring-1 ring-black/5">
            <p className="font-[var(--font-display)] text-xl">
              Inspired by Ayurveda
            </p>
            <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
              Ancient wisdom, modern snacks. We keep it light, inclusive, and
              delicious.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
