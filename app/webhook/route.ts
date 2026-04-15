import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: Request) {
  console.log("🔥 WEBHOOK MASUK");

  const rawBody = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!);
  } catch (err: unknown) {
    console.error("❌ SIGNATURE ERROR:", err);
    return Response.json({ error: "Signature error" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "invoice.payment_succeeded": {
        console.log("🔥 PAYMENT SUCCESS");

        const result = event.data.object as Stripe.Invoice;

        const supabase = await supabaseAdmin();

        const end_at = new Date(
          result.lines.data[0].period.end * 1000,
        ).toISOString();

        const customer_id =
          typeof result.customer === "string"
            ? result.customer
            : result.customer?.id;

        const subscription_id =
          result.parent?.subscription_details?.subscription;

        const email = result.customer_email as string;

        console.log("EMAIL:", email);
        console.log("CUSTOMER:", customer_id);
        console.log("SUB:", subscription_id);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", email)
          .single();

        if (profileError || !profile) {
          console.error("❌ PROFILE NOT FOUND:", email);
          return Response.json({ error: "Profile not found" }, { status: 404 });
        }

        const { data, error } = await supabase
          .from("subscription")
          .update({
            end_at,
            customer_id,
            subscription_id,
          })
          .eq("email", email);

        console.log("UPDATE RESULT:", data);
        console.log("UPDATE ERROR:", error);

        if (error) {
          return Response.json({ error: error.message });
        }

        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (e: unknown) {
    console.error("❌ WEBHOOK ERROR:", e);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
