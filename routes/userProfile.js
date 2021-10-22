'use strict';

const model = require('../database/model.js');

function get(req, res) {
  const user = req.session;
  const profileUserId = req.params.id;
  const greeting =
    user.id.toString() === profileUserId.toString()
      ? /* html */ `<h1>Welcome to your profile ${user.username}</h1>`
      : /* html */ `<h1>Welcome to someone else's page, ${user.username}!</h1>`;

  return model
    .getUserCats(profileUserId)
    .then((cats) => {
      if (cats.length) {
        return cats
          .map((cat) => {
            return /* html */ `
            <li>
                <h3><a href="/cats/${cat.id}">${cat.name}</a></h3>
                <a href="/cats/${cat.id}">
                  <img src="/cats/${cat.id}/avatar" alt="Picture of ${
              cat.name
            }" />
                <p>Added by <a href='/user/${cat.user_id}/profile'>${
              cat.username === user.username ? 'you' : cat.username
            }</a> on ${cat.created_at}</p>
              </li>
          `;
          })
          .join('');
      }
      return /* html */ `<li>You have no cats!</li>`;
    })
    .then((catHtml) =>
      res.send(/* html */ `
      ${greeting}
     <ul> ${catHtml} </ul>
  `)
    );
}

module.exports = { get };
