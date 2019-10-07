const router = require('express').Router();
const passport = require('passport');
const { tokenForAccount } = require('../services/tokenServices');

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
    const accountToken = tokenForAccount(req.user);
    res.header('accountToken', accountToken);
    res.redirect(
      'http://localhost:8080/signinsuccess?token=' + accountToken,
    );
  },
);

module.exports = router;
