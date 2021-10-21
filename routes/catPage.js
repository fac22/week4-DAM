'use strict';

const model = require('../database/model.js');

function get(req, res) {
  res.send('hello');
}

module.exports = { get };
