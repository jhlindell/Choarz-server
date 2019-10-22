const Account = require('../models/account.model');
const jwt = require('jsonwebtoken');

exports.tokenForAccount = account => {
  const timestamp = new Date().getTime();
  const payload = {
    _id: account._id,
    accountID: account.accountID,
    username: account.username,
    email: account.email,
    familyname: account.familyname,
    timestamp,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '14d',
  });
};

function getNameFromToken(token) {
  const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
  return decodedToken.familyname;
}

exports.getIdFromToken = token => {
  const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
  return decodedToken._id;
};

exports.accountname = token => {
  const name = getNameFromToken(token);
  return name;
};
