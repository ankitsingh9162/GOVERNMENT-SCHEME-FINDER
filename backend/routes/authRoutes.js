const express = require('express');
const passport = require('passport'); // ✅ correct
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Regular routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Helper to get clean frontend URL
const getFrontendUrl = () => {
  const url = process.env.FRONTEND_URL || 'http://localhost:5173';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

// Google OAuth
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback', (req, res, next) => {
  console.log('🏁 Google callback hit');
  next();
},
  passport.authenticate('google', { 
    failureRedirect: `${getFrontendUrl()}/login?error=auth_failed`,
    session: false 
  }),
  (req, res) => {
    console.log('✅ Google Auth success - Redirecting to frontend');
    
    const token = req.user.token;
    const userData = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      age: req.user.age,
      income: req.user.income,
      state: req.user.state,
      category: req.user.category,
      gender: req.user.gender
    };
    
    res.redirect(
      `${getFrontendUrl()}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`
    );
  }
);

module.exports = router;