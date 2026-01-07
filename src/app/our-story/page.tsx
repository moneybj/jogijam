import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/Button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The family-inspired story behind Jogi Jam Bars — a playful, whole-food snack brand with gentle Ayurvedic roots.",
};

export default function OurStoryPage() {
  return (
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Our Story"
          title="Made for a little boy named Jogi."
          description="Jogi Jam Bars began as a parent’s mission: create a snack that tastes like a treat, but is built from real whole foods — something a kid would actually want to eat."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[22px] border border-black/10 bg-white p-7 lg:col-span-2">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              Family joy, first.
            </p>
            <p className="mt-3 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
              Our founder started making date-based bars at home for his son,
              Jogindra — lovingly nicknamed “Jogi.” The goal was simple: a snack
              that could bring smiles to busy days, without the “what even is
              that?” ingredient list.
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
              That’s still our north star today. We keep the vibe warm and
              playful, the ingredients honest, and the experience family-first.
            </p>
          </div>

          <div className="rounded-[22px] border border-black/10 bg-white p-7">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              Playfully nourishing.
            </p>
            <p className="mt-3 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
              We’re inspired by Ayurveda’s love of balance and whole ingredients
              — but we talk about it like a friend, not a textbook.
            </p>
            <p className="mt-4 text-sm text-foreground/75 sm:text-xs sm:text-foreground/60">
              We don’t make medical claims. We just make really good snack bars.
            </p>
            <div className="mt-6 overflow-hidden rounded-[18px] border border-black/10 bg-jjb-surface">
              <Image
                src="/illustrations/jogi-elephant.svg"
                alt="Jogi mascot illustration"
                width={1200}
                height={900}
                className="jjb-float h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[22px] border border-black/10 bg-jjb-surface">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="font-[var(--font-display)] text-3xl tracking-tight">
                Our promise
              </p>
              <ul className="mt-5 space-y-3 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
                <li>
                  <span className="font-semibold text-foreground">
                    Real ingredients:
                  </span>{" "}
                  Dates, nuts/seeds, fruit, and gentle spices.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Fun without the fuss:
                  </span>{" "}
                  Bright, friendly branding that kids connect with.
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Trust for parents:
                  </span>{" "}
                  Clear labeling and honest, non-hype messaging.
                </li>
              </ul>
            </div>
            <div className="rounded-[18px] border border-black/10 bg-white p-7">
              <p className="font-[var(--font-display)] text-2xl tracking-tight">
                A tiny “Ayurvedic fun fact”
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
                Cardamom is a beloved spice in many Indian sweets and chai — warm
                and aromatic. We like to call it “grandma’s cozy spice.”
              </p>
              <p className="mt-4 text-sm text-foreground/75 sm:text-xs sm:text-foreground/60">
                (Fun fact only. Not medical advice.)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/products">Explore products</Button>
          <Button href="/contact" variant="secondary">
            Press / partnerships
          </Button>
        </div>
      </Container>
    </div>
  );
}


