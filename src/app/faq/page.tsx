import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Jogi Jam Bars — ingredients, allergens, Ayurveda inspiration, and where to find us.",
};

const faqs = [
  {
    q: "Are Jogi Jam Bars healthy?",
    a: "We keep it simple: whole-food ingredients like dates, nuts/seeds, fruits, and gentle spices. We avoid exaggerated claims and focus on transparent labeling so you can decide what works for your family.",
  },
  {
    q: "Do you use added sugar?",
    a: "Our sweetness comes primarily from dates and fruit. Specific nutrition facts will be listed clearly per flavor.",
  },
  {
    q: "Are they kid-friendly?",
    a: "Yes — we design kid flavors to be familiar and fun, with lunchbox-friendly portions. Parents get clear ingredient callouts up front.",
  },
  {
    q: "What does “Ayurveda-inspired” mean here?",
    a: "It means we borrow gentle, culturally rooted ingredients (like turmeric, cinnamon, or cardamom) and a whole-food approach — in a friendly, accessible way. We don’t make medical claims.",
  },
  {
    q: "Do they contain allergens?",
    a: "Some flavors may contain common allergens like nuts. We’ll label allergens clearly on each flavor and can explore nut-free options for school-safe snacking.",
  },
  {
    q: "Where can I buy Jogi Jam Bars?",
    a: "We’re building distribution with cafés and shops. If you want them in your local spot, tell us — we love community-powered launches.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-[radial-gradient(900px_420px_at_25%_0%,rgba(46,125,50,0.15),transparent),radial-gradient(900px_420px_at_85%_5%,rgba(216,27,96,0.16),transparent)]">
      <Container className="py-14 sm:py-18">
        <PageHeading
          eyebrow="FAQ"
          title="Questions? We’ve got you."
          description="Short, honest answers — with plenty of room for play."
        />

        <div className="mt-12 grid gap-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="jjb-card group bg-white/70 p-6 ring-1 ring-black/5 open:bg-white"
            >
              <summary className="cursor-pointer list-none font-semibold">
                <span className="flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-foreground/50 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-foreground/75">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}


