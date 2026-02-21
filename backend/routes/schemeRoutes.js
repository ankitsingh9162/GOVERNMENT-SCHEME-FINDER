const express = require('express');
const {
  getAllSchemes,
  getSchemeById,
  getEligibleSchemes,
  compareSchemes,
  createScheme,
} = require('../controllers/schemeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllSchemes);
router.get('/:id', getSchemeById);
router.post('/compare', compareSchemes);

// Protected routes (require login)
router.get('/user/eligible', protect, getEligibleSchemes);
router.post('/create', protect, createScheme);

module.exports = router;
