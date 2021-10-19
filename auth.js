'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model.js');

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

function createUser(username, email, password) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, email, hash));
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, { user });
}

module.exports = { createUser, saveUserSession, COOKIE_OPTIONS };
