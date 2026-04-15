"use server";

import Stripe from "stripe";

export async function checkout(
  email: string,
  priceId: string,
  redirectTo: string,
) {
  const stripe = new Stripe(process.env.STRIPE_SK!);
  return JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url: redirectTo || process.env.SITE_URL,
      cancel_url: process.env.SITE_URL,
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
    }),
  );
}

export async function manageBilling(customerId: string) {
  const stripe = new Stripe(process.env.STRIPE_SK!);
  return JSON.stringify(
    await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.SITE_URL as string,
    }),
  );
}