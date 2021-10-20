'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

async function verifyUser(email, password) {
  const user = await model.getUser(email);
  // THIS MUST BE REMOVED BEFORE MERGING----------------------
  let hashedEnteredPassword = await bcrypt.hash(password, 10);
  console.log(hashedEnteredPassword, user.password);
  // ---------------------------------------------------------
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Password mismatch');
  } else {
    delete user.password;
    return user;
  }
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, { user });
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

module.exports = { verifyUser, saveUserSession, COOKIE_OPTIONS };
