const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          console.error('❌ Google Auth - No email found in profile');
          return done(new Error('No email found in your Google account'), null);
        }

        const email = profile.emails[0].value;
        console.log('✅ Google Auth - Profile received:', email);

        let user = await User.findOne({ email });

        if (user) {
          console.log('✅ Existing user found');
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        } else {
          console.log('✅ Creating new user');
          // For Google Auth, we provide some safe defaults for required fields
          user = await User.create({
            name: profile.displayName || 'Google User',
            email: email,
            googleId: profile.id,
            age: 25,
            income: 300000,
            state: 'Delhi',
            category: 'General',
            gender: 'Other'
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', {
          expiresIn: '30d'
        });

        user.token = token;
        done(null, user);
      } catch (error) {
        console.error('❌ Google Auth error:', error);
        done(error, null);
      }
    }
  )
);

module.exports = passport;