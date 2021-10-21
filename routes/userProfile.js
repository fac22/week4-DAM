'use strict';

const model = require('../database/model.js');

function get(req, res) {
  const users = req.session;
  const html = /* html */ `
  <h1>Welcome to your profile ${users.username}</h1>
  
  `;
  model.getProfile(req.params.id).then((user) => {
    console.log(user.id, 'user.id result ');
    res.send(html);
  });
}

module.exports = { get };
