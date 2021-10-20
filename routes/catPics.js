'use strict';

const model = require('../database/model.js');

function get(req, res) {
  model.getAvatar(req.params.id).then((cat) => {
    res.send(cat.picture);
  });
}

module.exports = { get };
