const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Scheme name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    benefits: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Health',
        'Education',
        'Women',
        'Farmers',
        'Senior Citizens',
        'Startup/MSME',
        'Housing',
        'Employment',
        'Financial Assistance',
        'Other',
      ],
    },
    schemeType: {
      type: String,
      enum: ['Central', 'State'],
      default: 'Central',
    },
    state: {
      type: String,
      // Only required if schemeType is 'State'
    },
    // Eligibility Criteria
    eligibility: {
      minAge: {
        type: Number,
        min: 0,
      },
      maxAge: {
        type: Number,
        max: 150,
      },
      minIncome: {
        type: Number,
      },
      maxIncome: {
        type: Number,
      },
      states: {
        type: [String],
        // Array of state names
      },
      categories: {
        type: [String],
        // e.g., ['General', 'OBC', 'SC', 'ST']
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'All'],
        default: 'All',
      },
      requiresDisability: {
        type: Boolean,
        default: false,
      },
      requiresMinority: {
        type: Boolean,
        default: false,
      },
      occupations: {
        type: [String],
        // e.g., ['Farmer', 'Student', 'Unemployed']
      },
    },
    // Documents Required
    documents: {
      type: [String],
      default: [],
      // e.g., ['Aadhaar Card', 'Income Certificate', 'Bank Passbook']
    },
    // Application Details
    applicationLink: {
      type: String,
      trim: true,
    },
    lastDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    officialWebsite: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster searches
schemeSchema.index({ category: 1, schemeType: 1, isActive: 1 });

module.exports = mongoose.model('Scheme', schemeSchema);
