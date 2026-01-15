import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { DashboardApp } from "@/components/DashboardApp";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Internal dashboard for SEO, GEO/LLM optimization, traffic, keywords, and prompt packs.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Dashboard"
          title="SEO + GEO/LLM optimization"
          description="Manage keywords and prompt packs, track basic traffic, and keep technical SEO healthy."
        />
        <div className="mt-10">
          <DashboardApp />
        </div>
      </Container>
    </div>
  );
}


