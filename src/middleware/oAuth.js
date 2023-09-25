const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const passport = require("passport");
const User = require("../models/user");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_CLIENT_SECRET,
} = require("../config");

const GOOGLE_CALLBACK_URL = `${BASE_URL}/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const { id, displayName, emails } = profile;
        const { value: email } = emails[0];

        // Check if the user exists
        let userData = await User.findOne({ email });
        if (userData) {
          userData.displayName = displayName;
          userData.authMethod = "google";
          userData.password = id;
          userData = await userData.save();
        } else {
          // else create new user

          userData = await User.register({
            name: displayName,
            email,
            authMethod: "google",
            password: id,
          });
        }
        return cb(null, userData);
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/facebook/callback`,
      profileFields: ["id", "displayName", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const { id, displayName, emails } = profile;
        const { value: email } = emails[0];

        // Check if the user exists
        let userData = await User.findOne({ email });
        if (userData) {
          userData.displayName = displayName;
          userData.authMethod = "facebook";
          userData.password = id;
          userData = await userData.save();
        } else {
          // else create new user
          userData = await User.register({
            name: displayName,
            email,
            authMethod: "facebbok",
            password: id,
          });
        }
        return cb(null, userData);
      } catch (err) {
        cb(err);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;
