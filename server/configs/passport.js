import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const passportConfig = (passport) => {
  const callbackURL = process.env.NODE_ENV === 'production' 
    ? process.env.GOOGLE_CALLBACK_URL_PROD 
    : process.env.GOOGLE_CALLBACK_URL_LOCAL;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Google Profile:', profile);

          // Check if user exists with Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            console.log('Existing Google user found');
            return done(null, user);
          }

          // Check if user exists with same email
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            console.log('Linking Google to existing email user');
            user.googleId = profile.id;
            user.image = profile.photos[0]?.value || '';
            user.authProvider = 'google';
            await user.save();
            return done(null, user);
          }

          // Create new user
          console.log('Creating new Google user');
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            image: profile.photos[0]?.value || '',
            authProvider: 'google',
            password: Math.random().toString(36).slice(-8),
          });

          done(null, user);
        } catch (error) {
          console.error('Google OAuth Error:', error);
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default passportConfig;