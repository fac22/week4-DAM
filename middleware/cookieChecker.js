'use strict';

const model = require('../database/model.js');

async function cookieChecker(req, res, next) {
  const sid = req.signedCookies.sid;
  const user = await model.getSession(sid);
  if (user) {
    req.session = user;
  }
  next();
}

module.exports = cookieChecker;
