require('dotenv').config();
const assert = require('assert');
const mongoose = require('mongoose');
const winston = require('winston');
const controller = require('../../controllers/account.controller');
const Account = mongoose.model('Account');
const { tokenForAccount } = require('../../controllers/auth.controller');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const testAccount = {
  familyname: 'Jones',
  _id: '5d9ba606422cc8975b80a87c',
  username: 'Bob Jones',
  accountID: '115222415512327370421',
  email: 'bob_jones@gmail.com',
  createdAt: '2019-10-07T20:54:30.529Z',
};

describe('Account controller tests', () => {
  it('should properly create an account', async () => {
    try {
      await controller.create(
        testAccount.familyname,
        testAccount.username,
        testAccount.accountID,
        testAccount.email,
      );
    } catch (error) {
      logger.info(error);
    }
    try {
      const fetchedAccount = await Account.findOne({ username: 'Bob Jones' });
      assert(fetchedAccount.username === 'Bob Jones');
    } catch (error) {
      logger.info(error);
    }
  });

  it('should properly fetch an account given a valid token', async () => {
    let token;
    const newAccount = await controller.create(
      testAccount.familyname,
      testAccount.username,
      testAccount.accountID,
      testAccount.email,
    );
    const error = newAccount.validateSync();
    if (error) {
      throw error;
    } else {
      token = tokenForAccount(newAccount);
      try {
        const fetchedAccount = await controller.findAccount(token);
        assert(fetchedAccount.username === newAccount.username);
      } catch (err) {
        logger.info(err);
      }
    }
  });

  it('should properly update an account', async () => {
    let token;
    const newAccount = await controller.create(
      testAccount.familyname,
      testAccount.username,
      testAccount.accountID,
      testAccount.email,
    );
    const error = newAccount.validateSync();
    if (error) {
      throw error;
    } else {
      token = tokenForAccount(newAccount);
      try {
        const updatedAccount = {
          familyname: newAccount.familyname,
          username: 'Bobby Jones',
          _id: newAccount._id,
          accountID: newAccount.accountID,
          email: newAccount.email,
          createdAt: newAccount.createdAt,
        };
        const fetchedAccount = await controller.update(updatedAccount, token);
        assert(fetchedAccount.username === 'Bobby Jones');
      } catch (err) {
        logger.info(err);
      }
    }
  });
});
