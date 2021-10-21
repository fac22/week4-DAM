'use strict';

const model = require('../database/model.js');

function get(req, res) {
  model.getProfile(req.params.id).then((user) => {
    console.log(user.id, 'user.id result ');
    res.send(user.id);
  });
}

module.exports = { get };
