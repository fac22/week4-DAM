'use strict';

const model = require('../database/model.js');

function get(req, res) {
  const user = req.session;
  model
    .getCat(req.params.id)
    .then((result) => result.rows[0])
    .then((cat) =>
      res.send(/* html */ `
        <h2>${cat.name}</h2>
        <img src="/cats/${cat.id}/avatar" alt="Picture of ${cat.name}" />
        <p>Added by ${
          cat.username === user.username ? 'you' : cat.username
        } on ${cat.created_at}</p>
      `)
    );
}

module.exports = { get };
