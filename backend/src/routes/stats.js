const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get user blocking stats
// @route   GET /api/stats/me
// @access  Private
router.get('/me', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  res.json({
    success: true,
    data: {
      adsBlocked: user.stats.adsBlocked,
      trackersBlocked: user.stats.trackersBlocked,
      dataSaved: user.stats.dataSaved,
      timeSaved: user.stats.timeSaved,
    },
  });
}));

// @desc    Update blocking stats
// @route   POST /api/stats/update
// @access  Private
router.post('/update', protect, asyncHandler(async (req, res) => {
  const { adsBlocked, trackersBlocked, dataSaved, timeSaved } = req.body;
  
  const user = await User.findById(req.user.id);
  
  if (adsBlocked) user.stats.adsBlocked += parseInt(adsBlocked);
  if (trackersBlocked) user.stats.trackersBlocked += parseInt(trackersBlocked);
  if (dataSaved) user.stats.dataSaved = dataSaved;
  if (timeSaved) user.stats.timeSaved = timeSaved;
  
  await user.save();
  
  res.json({
    success: true,
    data: user.stats,
  });
}));

// @desc    Get global stats (public)
// @route   GET /api/stats/global
// @access  Public
router.get('/global', asyncHandler(async (req, res) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: null,
        totalAdsBlocked: { $sum: '$stats.adsBlocked' },
        totalTrackersBlocked: { $sum: '$stats.trackersBlocked' },
        totalUsers: { $sum: 1 },
      },
    },
  ]);
  
  res.json({
    success: true,
    data: stats[0] || {
      totalAdsBlocked: 0,
      totalTrackersBlocked: 0,
      totalUsers: 0,
    },
  });
}));

module.exports = router;
