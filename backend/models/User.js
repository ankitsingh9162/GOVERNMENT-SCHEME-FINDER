const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    // Profile Information
    age: {
      type: Number,
      min: 0,
      max: 150,
    },
    income: {
      type: Number,
      min: 0,
    },
    state: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    },
    occupation: {
      type: String,
      trim: true,
    },
    disability: {
      type: Boolean,
      default: false,
    },
    minority: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    // Saved Schemes
    savedSchemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
