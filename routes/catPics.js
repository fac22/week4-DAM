'use strict';

const model = require('../database/model.js');

function get(req, res) {
  model
    .getAvatar(req.params.id)
    .then((cat) => {
      res.send(cat.picture);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('cat not found 😿');
    });
}

module.exports = { get };
