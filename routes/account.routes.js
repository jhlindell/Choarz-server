const router = require('express').Router();
const accounts = require('../controllers/account.controller');
require('../config/passport-setup');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, async (req, res) => {
  const token = req.headers.authorization;
  try {
    const account = await accounts.findAccount(token);
    if (account._id) {
      console.log(account);
      res.send(account);
    }
  } catch (err) {
    if (
      err.message === 'Account not found with supplied id' ||
      err.kind === 'ObjectId'
    ) {
      res.status(404).send(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.put('/', requireAuth, async (req, res) => {
  const account = req.body;
  try {
    const result = accounts.update(account);
    res.send(result);
  } catch (err) {
    if (
      err.kind === 'ObjectId' ||
      err.message == 'Account not found with supplied id'
    ) {
      res.status(404).send({
        message: 'Account not found with supplied id',
      });
    } else {
      res.status(500).send({
        message: err.message,
      });
    }
  }
});

module.exports = router;
