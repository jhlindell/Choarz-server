const Account = require('../models/account.model');
const jwt = require('jsonwebtoken');

exports.tokenForAccount = account => {
  const timestamp = new Date().getTime();
  const payload = {
    ID: account._id,
    username: account.username,
    email: account.email,
    familyname: account.familyname,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '14d',
  });
};
