import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHeading } from "@/components/PageHeading";
import { BuyNowButton } from "@/components/BuyNowButton";
import { getShopifyConfig, shopifyFetch } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop",
  description: "Buy Jogi Jam Bars via Shopify checkout.",
};

type ProductsQuery = {
  products: {
    nodes: Array<{
      id: string;
      title: string;
      handle: string;
      featuredImage: { url: string; altText: string | null } | null;
      variants: { nodes: Array<{ id: string; price: { amount: string; currencyCode: string } }> };
    }>;
  };
};

export default async function ShopPage() {
  const cfg = getShopifyConfig();

  if (!cfg) {
    return (
      <div className="bg-background">
        <Container className="py-12 sm:py-16">
          <PageHeading
            eyebrow="Shop"
            title="Connect Shopify to enable checkout."
            description="This page is ready, but needs your Shopify Storefront API credentials."
          />

          <div className="mt-10 overflow-hidden rounded-[22px] border border-black/10 bg-white">
            <div className="border-b border-black/10 bg-jjb-surface px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                Required environment variables
              </p>
            </div>
            <div className="p-8">
              <pre className="whitespace-pre-wrap rounded-[18px] border border-black/10 bg-jjb-surface p-5 text-sm leading-6 text-foreground/80">
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=YOUR_TOKEN
SHOPIFY_STOREFRONT_API_VERSION=2025-01
              </pre>
              <p className="mt-4 text-sm text-foreground/70">
                See <code className="font-semibold">docs/SHOPIFY_SETUP.md</code>{" "}
                for step-by-step instructions.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const query = /* GraphQL */ `
    query Products($first: Int!) {
      products(first: $first) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            nodes {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ProductsQuery>({
    query,
    variables: { first: 12 },
    cache: "no-store",
  });

  return (
    <div className="bg-background">
      <Container className="py-12 sm:py-16">
        <PageHeading
          eyebrow="Shop"
          title="Checkout powered by Shopify."
          description="Pick a product and complete payment in Shopify’s secure checkout."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.products.nodes.map((p) => {
            const v = p.variants.nodes[0];
            return (
              <div
                key={p.id}
                className="overflow-hidden rounded-[22px] border border-black/10 bg-white"
              >
                <div className="bg-jjb-surface p-4">
                  {p.featuredImage ? (
                    <Image
                      src={p.featuredImage.url}
                      alt={p.featuredImage.altText ?? p.title}
                      width={1200}
                      height={800}
                      className="h-auto w-full rounded-[18px] border border-black/10 bg-white object-cover"
                    />
                  ) : (
                    <div className="h-48 rounded-[18px] border border-black/10 bg-white" />
                  )}
                </div>

                <div className="p-5">
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
                    {v.price.currencyCode} {Number(v.price.amount).toFixed(2)}
                  </p>

                  <div className="mt-4">
                    <BuyNowButton merchandiseId={v.id} />
                  </div>

                  <p className="mt-3 text-xs text-foreground/60">
                    You’ll be redirected to Shopify checkout to pay.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}


