const passport = require('passport');
const Account = require('../models/account.model');
const GoogleStrategy = require('passport-google-oauth20');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const googleStrat = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    const currentAccount = await Account.findOne({
      accountID: profile.id,
    });
    if (currentAccount) {
      return done(null, currentAccount);
    } else {
      const account = new Account({
        username: profile.displayName,
        accountID: profile.id,
        email: profile._json.email,
        familyname: profile._json.family_name,
      });
      try {
        const newAccount = await account.save();
        return done(null, newAccount);
      } catch (err) {
        throw err;
      }
    }
  },
);

const JwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user id in the payload exists in the database
  // if it does, call done with that
  // otherwise, call done without a user object
  Account.findById(payload._id, (err, user) => {
    if (err) {
      done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(googleStrat);
passport.use(JwtLogin);
