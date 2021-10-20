'use strict';

const checkAuth = (req, res, next) => {
  const user = req.session;
  if (user) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = checkAuth;
