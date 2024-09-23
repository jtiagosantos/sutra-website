"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";

const schema = z.object({
  customerId: z.string(),
  priceId: z.string(),
  cancelURL: z.string(),
  successURL: z.string(),
});

export const createCheckoutSessionAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { customerId, priceId, cancelURL, successURL } }) => {
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      cancel_url: cancelURL,
      success_url: successURL,
      locale: "pt-BR",
    });

    return {
      url: checkoutSession.url,
    }
  });