'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { stripe } from '@/lib/stripe';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const registerCustomerAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { name, email } }) => {
    const customer = await stripe.customers.create({ name, email });

    return {
      code: 202,
      customer: {
        id: customer.id,
      },
    };
  });
