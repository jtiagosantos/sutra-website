'use server';

import { z } from 'zod';
import { actionClient } from '@/lib/safe-action';
import { stripe } from '@/lib/stripe';

const schema = z.object({
  customerId: z.string(),
  privacyPolicyURL: z.string(),
  termsOfServiceURL: z.string(),
});

export const createPortalSessionAction = actionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { customerId, privacyPolicyURL, termsOfServiceURL } }) => {
      const portalConfiguration = await stripe.billingPortal.configurations.create({
        features: {
          customer_update: {
            enabled: false,
          },
          subscription_cancel: {
            enabled: true,
            mode: 'immediately',
            proration_behavior: 'none',
          },
          invoice_history: {
            enabled: true,
          },
          payment_method_update: {
            enabled: true,
          },
        },
        business_profile: {
          privacy_policy_url: privacyPolicyURL,
          terms_of_service_url: termsOfServiceURL,
        },
      });

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        configuration: portalConfiguration.id,
        locale: 'pt-BR',
      });

      return {
        url: portalSession.url,
      };
    },
  );
