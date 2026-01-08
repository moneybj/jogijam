import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

type CheckoutRequest = {
  merchandiseId: string;
  quantity?: number;
};

export async function POST(req: Request) {
  let body: CheckoutRequest;
  try {
    body = (await req.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const merchandiseId = body.merchandiseId;
  const quantity = Math.max(1, Math.min(99, Number(body.quantity ?? 1)));

  if (!merchandiseId || typeof merchandiseId !== "string") {
    return NextResponse.json(
      { error: "merchandiseId is required." },
      { status: 400 },
    );
  }

  const mutation = /* GraphQL */ `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: Array<{ field: string[] | null; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        input: {
          lines: [{ merchandiseId, quantity }],
        },
      },
      cache: "no-store",
    });

    const errs = data.cartCreate.userErrors ?? [];
    if (errs.length) {
      return NextResponse.json(
        { error: errs.map((e) => e.message).join("; ") },
        { status: 400 },
      );
    }

    const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "No checkoutUrl returned from Shopify." },
        { status: 502 },
      );
    }

    return NextResponse.json({ checkoutUrl });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Shopify error." },
      { status: 502 },
    );
  }
}


