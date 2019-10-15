const router = require('express').Router();
require('../config/passport-setup');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const auth = require('../controllers/auth.controller');

//auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/google/redirect',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const accountToken = auth.tokenForAccount(req.user);
    res.header('accountToken', accountToken);
    res.redirect(
      'http://localhost:8080/signinsuccess?token=' + accountToken,
    );
  },
);

router.get('/accountname', requireAuth, (req, res) => {
  const token = req.headers.authorization;
  const accountname = auth.accountname(token);
  res.send(accountname);
});

module.exports = router;
