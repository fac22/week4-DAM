'use strict';

const model = require('../database/model.js');

function get(req, res) {
  const user = req.session;
  model
    .getCat(req.params.id)
    .then(
      (cat) => /* html */ `
        <h2>${cat.name}</h2>
        <img src="/cats/${cat.id}/avatar" alt="Picture of ${cat.name}" />
        <p>Added by ${
          cat.username === user.username ? 'you' : cat.username
        } on ${cat.created_at}</p>
        <h3>Comments</h3>
      `
    )
    .then((catHtml) =>
      model
        .getComments(req.params.id)
        .then((comments) =>
          comments.map(
            (comment) => /* html */ `
    <p>${comment.text_content}</p>
    <p>Written by ${
      comment.username === user.username ? 'you' : comment.username
    } on ${comment.created_at}</p>
    `
          )
        )
        .then((commentHtml) => commentHtml + catHtml)
    )
    .then(res.send)
    .catch(() => res.send('Error getting cat'));
}

module.exports = { get };
