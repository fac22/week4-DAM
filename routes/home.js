'use strict';

const model = require('../database/model.js');

function get(request, response) {
  const user = request.session;
  if (user) {
    model
      .getCats()
      .then((cats) =>
        cats
          .map((cat) => {
            return /* html */ `
              <li>
                <h3>${cat.name}</h3>
                <img src="TBC" alt="TBC" />
                <p>Added by ${
                  cat.username === user.username ? 'you' : cat.username
                } on ${cat.created_at}</p>
              </li>
            `;
          })
          .join('')
      )
      .then((html) =>
        response.send(/* html */ `
        <div>
              <form action="/logout" method="POST">
                <button id="logoutBtn">Log out</button>
              </form>  
            </div>
    <h2>Here are all the cats we have, ${user.username}!</h2>
    <ul>
      ${html}
    </ul>
    `)
      );
  } else {
    response.send(/* html */ `
    <h2>You shouldn't be seeing this. Not sure how you got here 🤔 You need to <a href="/login">login</a> first!</h2>
    `);
  }
}

module.exports = { get };
