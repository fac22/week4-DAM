"use strict";

const auth = require("../auth.js");

function get(request, response) {
  const html = /* html */ `
      <h1>Login</h1>

      <form action="/login" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <a href="/signup" >Sign up</a>
  `;
  response.send(html);
}

function post(request, response) {
  const { email, password } = request.body;

  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      return response.send(/* html */ `<h1>User not found!</h1>`);
    });
}

module.exports = { get, post };
