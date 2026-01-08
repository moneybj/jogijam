# Shopify payment hub (hosted checkout) setup

This project uses the **Shopify Storefront API** to create a cart and redirect customers to **Shopify-hosted checkout**.

## What you need from Shopify

- **Store domain** (example): `your-store.myshopify.com`
- **Storefront access token**:
  - Shopify Admin → **Apps** → **Develop apps** → your app
  - Enable **Storefront API access**
  - Create **Storefront access token**

## Environment variables

Set these environment variables locally and in Vercel:

- `SHOPIFY_STORE_DOMAIN` (example: `your-store.myshopify.com`)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (starts with `shpat_...` or similar)
- `SHOPIFY_STOREFRONT_API_VERSION` (optional, default: `2025-01`)

### Local dev (example)

Create a `.env.local` file (not committed) in the project root:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=YOUR_TOKEN
SHOPIFY_STOREFRONT_API_VERSION=2025-01
```

## How it works

- `/shop` fetches products server-side via Storefront API
- Clicking **Buy now** calls `/api/shopify/checkout`, which:
  - creates a Shopify cart with the selected variant
  - returns `checkoutUrl`
  - the browser redirects to Shopify checkout


