const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const User = require('../models/User');

// @desc    Stripe webhook handler
// @route   POST /webhooks/stripe
// @access  Public (but secured by Stripe signature)
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Create or update subscription
        const subscription = await Subscription.create({
          user: session.client_reference_id,
          stripeSubscriptionId: session.subscription,
          stripeCustomerId: session.customer,
          plan: session.metadata.plan,
          interval: session.metadata.interval,
          price: session.amount_total / 100,
          status: 'active',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        
        // Update user plan
        await User.findByIdAndUpdate(session.client_reference_id, {
          plan: session.metadata.plan,
        });
        
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: invoice.subscription },
          {
            $push: {
              invoices: {
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_paid / 100,
                currency: invoice.currency,
                status: 'paid',
                paidAt: new Date(),
                pdfUrl: invoice.invoice_pdf,
              },
            },
          }
        );
        
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: invoice.subscription },
          {
            $push: {
              invoices: {
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_due / 100,
                currency: invoice.currency,
                status: 'failed',
              },
            },
            status: 'past_due',
          }
        );
        
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          { status: 'cancelled', canceledAt: new Date() }
        );
        
        // Revert user to free plan
        const sub = await Subscription.findOne({ stripeSubscriptionId: subscription.id });
        if (sub) {
          await User.findByIdAndUpdate(sub.user, { plan: 'free' });
        }
        
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

module.exports = router;
