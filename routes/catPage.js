'use strict';

const model = require('../database/model.js');

function get(request, response) {
  const user = request.session;
  model
    .getCat(request.params.id)
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
        .getComments(request.params.id)
        .then((comments) => {
          if (comments.length) {
            return comments
              .map(
                (comment) => /* html */ `
    <p>${comment.text_content}</p>
    <p>Written by ${
      comment.username === user.username ? 'you' : comment.username
    } on ${comment.created_at}</p>
    `
              )
              .join('');
          }
          return /* html */ `No comments!`;
        })
        .then((commentHtml) => catHtml + commentHtml)
    )
    .then((html) => response.send(html))
    .catch((error) => {
      console.log(error);
      response.send('Error getting cat');
    });
}

module.exports = { get };
