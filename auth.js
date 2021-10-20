'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

async function verifyUser(email, password) {
  const user = await model.getUser(email);
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Password mismatch');
  } else {
    delete user.password;
    return user;
  }
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

module.exports = { verifyUser, COOKIE_OPTIONS };
