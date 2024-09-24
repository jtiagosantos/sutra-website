import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateUserSubscriptionStatusAction } from '@/actions/update-user-subscription-status-action';

const relevantEvents = new Set([
  'invoice.paid',
  'invoice.payment_failed',
  'customer.subscription.deleted',
]);

const secret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const POST = async (request: NextRequest) => {
  try {
    const payload = await request.text();

    const signature = request.headers.get('stripe-signature')!;

    const event = stripe.webhooks.constructEvent(payload, signature, secret);

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        const input = event.data.object as unknown as Record<string, unknown>;
        const customerId = input.customer as string;

        switch (type) {
          case 'invoice.paid': {
            await updateUserSubscriptionStatusAction({
              customerId,
              status: 'ACTIVE',
            });
            break;
          }

          case 'invoice.payment_failed': {
            await updateUserSubscriptionStatusAction({
              customerId,
              status: 'INACTIVE',
            });
            break;
          }

          case 'customer.subscription.deleted': {
            await updateUserSubscriptionStatusAction({
              customerId,
              status: 'CANCELED',
            });
            break;
          }

          default: {
            return NextResponse.json(
              {
                message: `[Webhook] Unhandled event: ${event}`,
                ok: false,
              },
              { status: 500 },
            );
          }
        }
      } catch (error) {
        return NextResponse.json(
          {
            message: '[Webhook] Handler failed',
            ok: false,
            error,
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: '[Webhook] Internal server error',
        ok: false,
        error,
      },
      { status: 500 },
    );
  }
};
