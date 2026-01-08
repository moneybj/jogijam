export type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyVariant = {
  id: string;
  price: ShopifyMoneyV2;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage: ShopifyImage | null;
  variants: { nodes: ShopifyVariant[] };
};

function getEnv(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : null;
}

export function getShopifyConfig() {
  const domainRaw = getEnv("SHOPIFY_STORE_DOMAIN");
  const token = getEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  const version = getEnv("SHOPIFY_STOREFRONT_API_VERSION") ?? "2025-01";

  if (!domainRaw || !token) return null;

  const domain = domainRaw.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const endpoint = `https://${domain}/api/${version}/graphql.json`;

  return { domain, token, endpoint };
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  const cfg = getShopifyConfig();
  if (!cfg) {
    throw new Error(
      "Missing Shopify config. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  const res = await fetch(cfg.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": cfg.token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  const json = (await res.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (!res.ok || json.errors?.length) {
    const msg =
      json.errors?.map((e) => e.message).join("; ") ||
      `Shopify request failed (${res.status})`;
    throw new Error(msg);
  }

  if (!json.data) throw new Error("Shopify response missing data.");
  return json.data;
}


