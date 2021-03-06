const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = Schema({
  familyname: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accountID: {
    type: String,
    required: [true, 'ID is required'],
  },
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
