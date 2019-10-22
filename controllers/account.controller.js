const Account = require('../models/account.model');
const mongoose = require('mongoose');
const { getIdFromToken } = require('./auth.controller');

exports.findAccount = token => {
  const id = getIdFromToken(token);
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  return Account.findById(id)
    .then(account => {
      if (account) {
        return account;
      }
      throw new Error('Account not found with supplied id');
    })
    .catch(err => {
      throw err;
    });
};

exports.update = (account, token) => {
  const tokenId = getIdFromToken(token);
  const accountId = account._id;
  let objectId;

  if (tokenId !== accountId) {
    throw new Error('Id mismatch');
  } else {
    try {
      objectId = mongoose.Types.ObjectId(accountId);
    } catch (err) {
      throw err;
    }
  }
  const updatedAccount = new Account({
    _id: account._id,
    familyname: account.familyname,
    username: account.username,
    accountID: account.accountID,
    email: account.email,
    createdAt: account.createdAt,
  });
  const error = updatedAccount.validateSync();
  if (error) {
    throw error;
  } else {
    return Account.findByIdAndUpdate(objectId, updatedAccount, { new: true })
      .then(result => {
        if (result) {
          return result;
        }
        throw new Error('Account not found with supplied id');
      })
      .catch(err => {
        throw err;
      });
  }
};
