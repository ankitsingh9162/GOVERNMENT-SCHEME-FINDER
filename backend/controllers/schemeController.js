const Scheme = require('../models/Scheme');

// Helper function to check eligibility
const checkEligibility = (user, scheme) => {
  const rules = scheme.eligibility;

  // Age check
  if (rules.minAge && user.age < rules.minAge) return false;
  if (rules.maxAge && user.age > rules.maxAge) return false;

  // Income check
  if (rules.minIncome && user.income < rules.minIncome) return false;
  if (rules.maxIncome && user.income > rules.maxIncome) return false;

  // State check (for state-specific schemes)
  if (rules.states && rules.states.length > 0) {
    if (!rules.states.includes(user.state)) return false;
  }

  // Category check
  if (rules.categories && rules.categories.length > 0) {
    if (!rules.categories.includes(user.category)) return false;
  }

  // Gender check
  if (rules.gender && rules.gender !== 'All') {
    if (rules.gender !== user.gender) return false;
  }

  // Disability check
  if (rules.requiresDisability && !user.disability) return false;

  // Minority check
  if (rules.requiresMinority && !user.minority) return false;

  // Occupation check
  if (rules.occupations && rules.occupations.length > 0) {
    if (!rules.occupations.includes(user.occupation)) return false;
  }

  return true;
};

// @desc    Get all schemes (with optional filters)
// @route   GET /api/schemes
// @access  Public
const getAllSchemes = async (req, res) => {
  try {
    const { category, schemeType, state } = req.query;

    let filter = { isActive: true };

    if (category) filter.category = category;
    if (schemeType) filter.schemeType = schemeType;
    if (state) filter.state = state;

    const schemes = await Scheme.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single scheme by ID
// @route   GET /api/schemes/:id
// @access  Public
const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get eligible schemes for logged-in user
// @route   GET /api/schemes/eligible
// @access  Private
const getEligibleSchemes = async (req, res) => {
  try {
    // Get all active schemes
    const allSchemes = await Scheme.find({ isActive: true });

    // Filter schemes based on user profile
    const eligibleSchemes = allSchemes.filter((scheme) => {
      return checkEligibility(req.user, scheme);
    });

    res.json({
      success: true,
      count: eligibleSchemes.length,
      data: eligibleSchemes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Compare two schemes
// @route   POST /api/schemes/compare
// @access  Public
const compareSchemes = async (req, res) => {
  try {
    const { schemeId1, schemeId2 } = req.body;

    if (!schemeId1 || !schemeId2) {
      return res.status(400).json({ message: 'Please provide two scheme IDs' });
    }

    const scheme1 = await Scheme.findById(schemeId1);
    const scheme2 = await Scheme.findById(schemeId2);

    if (!scheme1 || !scheme2) {
      return res.status(404).json({ message: 'One or both schemes not found' });
    }

    res.json({
      success: true,
      data: {
        scheme1,
        scheme2,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new scheme (Admin only - we'll add admin check later)
// @route   POST /api/schemes
// @access  Private
const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSchemes,
  getSchemeById,
  getEligibleSchemes,
  compareSchemes,
  createScheme,
};
