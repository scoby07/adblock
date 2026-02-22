const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get user subscription
// @route   GET /api/subscriptions/me
// @access  Private
router.get('/me', protect, asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ 
    user: req.user.id,
    status: { $in: ['active', 'pending'] }
  }).sort({ createdAt: -1 });
  
  res.json({
    success: true,
    data: subscription,
  });
}));

// @desc    Get subscription history
// @route   GET /api/subscriptions/history
// @access  Private
router.get('/history', protect, asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    data: subscriptions,
  });
}));

// @desc    Get invoices
// @route   GET /api/subscriptions/invoices
// @access  Private
router.get('/invoices', protect, asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ user: req.user.id });
  
  res.json({
    success: true,
    data: subscription?.invoices || [],
  });
}));

// @desc    Cancel subscription
// @route   POST /api/subscriptions/cancel
// @access  Private
router.post('/cancel', protect, asyncHandler(async (req, res) => {
  const subscription = await Subscription.findOne({ 
    user: req.user.id,
    status: 'active'
  });
  
  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'No active subscription found',
    });
  }
  
  subscription.cancelAtPeriodEnd = true;
  await subscription.save();
  
  res.json({
    success: true,
    message: 'Subscription will be cancelled at the end of the billing period',
    data: subscription,
  });
}));

module.exports = router;
