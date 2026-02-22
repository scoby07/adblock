const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { asyncHandler } = require('../middleware/errorHandler');

// All routes are protected and admin-only
router.use(protect, adminOnly);

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
router.get('/stats', asyncHandler(async (req, res) => {
  const [
    totalUsers,
    activeUsers,
    newUsersToday,
    totalSubscriptions,
    monthlyRevenue,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
    User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
    Subscription.countDocuments({ status: 'active' }),
    Subscription.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]),
  ]);
  
  res.json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      newUsersToday,
      totalSubscriptions,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
    },
  });
}));

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
router.get('/users', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, status, plan } = req.query;
  
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (status) query.status = status;
  if (plan) query.plan = plan;
  
  const users = await User.find(query)
    .select('-password -verificationToken -resetPasswordToken -resetPasswordExpire')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  
  const count = await User.countDocuments(query);
  
  res.json({
    success: true,
    data: users,
    pagination: {
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
    },
  });
}));

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Admin
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password -verificationToken -resetPasswordToken -resetPasswordExpire');
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  
  res.json({
    success: true,
    data: user,
  });
}));

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Admin
router.put('/users/:id', asyncHandler(async (req, res) => {
  const { plan, role, status } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { plan, role, status },
    { new: true, runValidators: true }
  ).select('-password -verificationToken -resetPasswordToken -resetPasswordExpire');
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  
  res.json({
    success: true,
    data: user,
  });
}));

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Admin
router.delete('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  
  res.json({
    success: true,
    message: 'User deleted successfully',
  });
}));

// @desc    Get all subscriptions
// @route   GET /api/admin/subscriptions
// @access  Admin
router.get('/subscriptions', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  
  const subscriptions = await Subscription.find()
    .populate('user', 'name email')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  
  const count = await Subscription.countDocuments();
  
  res.json({
    success: true,
    data: subscriptions,
    pagination: {
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
    },
  });
}));

module.exports = router;
