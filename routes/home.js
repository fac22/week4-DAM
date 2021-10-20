'use strict';

function get(request, response) {
  const user = request.session;
  if (user) {
    response.send(/* html */ `
    <h1>Hello ${user.username}!</h1>
    `);
  } else {
    response.send(/* html */ `
    <h1>You shouldn't be seeing this. Not sure how you got here 🤔 You need to <a href="/login">login</a> first!</h1>
    `);
  }
}

module.exports = { get };
