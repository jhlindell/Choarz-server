require('dotenv').config();
const {
  accountname,
  getIdFromToken,
} = require('../../controllers/auth.controller');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const jwtSecret = 'supersecretjwtphrase';

let testToken;
const account = {
  familyname: 'Jones',
  _id: '5d9ba606422cc8975b80a87c',
  username: 'Bob Jones',
  accountID: '115222415512327370421',
  email: 'bob_jones@gmail.com',
};

const timestamp = new Date().getTime();
const payload = {
  _id: account._id,
  accountID: account.accountID,
  username: account.username,
  email: account.email,
  familyname: account.familyname,
  timestamp,
};
testToken = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: '14d',
});

describe('Auth Controller Test', () => {
  it('getIdFromToken should properly retrieve the id from the token', () => {
    const id = getIdFromToken(testToken);
    assert(id === account._id);
  });
  it('accountname should properly retrieve the family name from the token', () => {
    const name = accountname(testToken);
    assert(name === account.familyname);
  });
});
