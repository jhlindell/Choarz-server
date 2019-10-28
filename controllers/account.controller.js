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
  return Account.findById(objectId)
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

exports.create = async (familyname, username, accountID, email) => {
  const account = new Account({
    familyname,
    username,
    email,
    accountID,
  });
  const error = account.validateSync();
  if (error) {
    throw error;
  } else {
    try {
      const newAccount = await account.save();
      return newAccount;
    } catch (err) {
      throw err;
    }
  }
};

exports.update = account => {
  const accountId = account._id;
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(accountId);
  } catch (err) {
    throw err;
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
        console.log('thenerror');
        throw new Error('Account not found with supplied id');
      })
      .catch(err => {
        console.log('catcherror');
        throw err;
      });
  }
};
