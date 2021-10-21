'use strict';

const model = require('../database/model.js');

function get(req, res) {
  const user = req.session;
  model
    .getCat(req.params.id)
    .then((cat) => {
      console.log(cat);
      console.log(user);
      res.send(/* html */ `
        <h2>${cat.name}</h2>
        <img src="/cats/${cat.cat_id}/avatar" alt="Picture of ${cat.name}" />
        <p>Added by ${
          cat.username === user.username ? 'you' : cat.username
        } on ${cat.created_at}</p>
      `);
    })
    .catch(() => res.send('Error getting cat'));
}

module.exports = { get };
