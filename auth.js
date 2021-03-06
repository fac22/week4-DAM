'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

function createUser(username, email, password) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, email, hash));
}

async function verifyUser(email, password) {
  const user = await model.getUser(email);
  const match = await bcrypt.compare(password, user.password);

  if (!email || !password) {
    throw new Error('Please insert an email and a password');
  } else if (!match) {
    throw new Error('Password mismatch');
  } else {
    delete user.password;
    return user;
  }
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, user);
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

module.exports = { createUser, verifyUser, saveUserSession, COOKIE_OPTIONS };
