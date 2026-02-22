const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'teams'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'pending', 'past_due'],
    default: 'pending',
  },
  interval: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  stripeCustomerId: {
    type: String,
  },
  currentPeriodStart: {
    type: Date,
  },
  currentPeriodEnd: {
    type: Date,
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
  canceledAt: {
    type: Date,
  },
  invoices: [{
    stripeInvoiceId: String,
    amount: Number,
    currency: String,
    status: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
    },
    paidAt: Date,
    pdfUrl: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

// Indexes
subscriptionSchema.index({ user: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ stripeSubscriptionId: 1 });
subscriptionSchema.index({ currentPeriodEnd: 1 });

// Check if subscription is active
subscriptionSchema.methods.isActive = function() {
  return this.status === 'active' && this.currentPeriodEnd > new Date();
};

// Cancel subscription
subscriptionSchema.methods.cancel = async function() {
  this.status = 'cancelled';
  this.canceledAt = new Date();
  await this.save();
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
