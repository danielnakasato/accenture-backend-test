const express = require('express');
const userRoutes = require('./src/modules/user/user.route');
const authRoutes = require('./src/modules/auth/auth.route');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
  res.send('OK');
});

// Routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
