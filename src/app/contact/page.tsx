import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jogi Jam Bars for questions, partnerships, and wholesale inquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Contact"
          title="Let’s make snack time happier."
          description="Questions, café partnerships, press, or just want to say hi? Drop us a note."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[22px] border border-black/10 bg-white p-7 lg:col-span-2">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              Email us
            </p>
            <p className="mt-2 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
              The fastest way to reach us:
            </p>
            <p className="mt-4">
              <a
                className="text-lg font-semibold text-foreground hover:underline"
                href="mailto:hello@jogijambars.com"
              >
                hello@jogijambars.com
              </a>
            </p>

            <div className="mt-8 rounded-[18px] border border-black/10 bg-jjb-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Wholesale / cafés
              </p>
              <p className="mt-1 text-base leading-7 text-foreground/85 sm:text-sm sm:leading-6 sm:text-foreground/70">
                Include your shop name, location, and approximate weekly volume.
                We’ll follow up with next steps.
              </p>
              <div className="mt-4">
                <Button href="/cafe-partners" variant="secondary">
                  Partnership overview
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-black/10 bg-white p-7">
            <p className="font-[var(--font-display)] text-2xl tracking-tight">
              “Jam” updates
            </p>
            <p className="mt-3 text-base leading-7 text-foreground/85 sm:text-sm sm:text-foreground/75">
              Want first dibs on new flavors, pop-ups, and partner cafés?
            </p>
            <form className="mt-5 space-y-3">
              <label className="block text-sm font-semibold text-foreground/85 sm:text-xs sm:text-foreground/70">
                Email
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded bg-white px-4 py-3 text-sm ring-1 ring-black/15 focus:outline-none focus:ring-2 focus:ring-black/25"
                />
              </label>
              <button
                type="button"
                className="w-full rounded bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background hover:bg-foreground/90"
              >
                Join the Jam (coming soon)
              </button>
              <p className="text-sm text-foreground/75 sm:text-xs sm:text-foreground/60">
                No spam. Just snack-time joy.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}


