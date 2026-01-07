import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { SubscribeBuilder } from "@/components/SubscribeBuilder";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Weekly or monthly deliveries with mix-and-match boxes — plus à la carte ordering and a custom bar builder.",
};

export default function SubscribePage() {
  return (
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Subscribe"
          title="Weekly or monthly delivery — your way."
          description="Mix & match a box, keep ordering à la carte, and even add a custom bar to your order."
        />

        <div className="mt-10">
          <SubscribeBuilder />
        </div>
      </Container>
    </div>
  );
}


