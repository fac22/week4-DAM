'use strict';

const model = require('../database/model.js');

function get(request, response) {
  const user = request.session;
  const catId = request.params.id;
  model
    .getCat(catId)
    .then(
      (cat) => /* html */ `
        <h2>${cat.name}</h2>
        <img src="/cats/${cat.id}/avatar" alt="Picture of ${cat.name}" />
        <p>Added by ${
          cat.username === user.username ? 'you' : cat.username
        } on ${cat.created_at}</p>
        <h3>Comments</h3>
        <form action="/cats/${catId}" method="POST">
          <h4>Write a comment:</h4>
          <label for="comment">Comment: </label>
          <textarea name="comment" id="comment"></textarea>
          <button type="submit">Post comment!</button>
        </form>
      `
    )
    .then((catHtml) =>
      model
        .getComments(catId)
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

function post(request, response) {
  const catId = request.params.id;
  const user = request.session;
  const comment = request.body.comment;
  model
    .createComment(catId, user.id, comment)
    .then(() => response.redirect(`/cats/${catId}`))
    .catch((error) => {
      console.log(error);
      response.send('error posting comment');
    });
}

module.exports = { get, post };
