'use strict';

function get(request, response) {
  const html = /* html */ `
      <h1>Login</h1>

      <form action="/login" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
        <label for="password">password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
  `;
  response.send(html);
}

function post(request, response) {
  const { email, password } = request.body;

  console.log(email, password);
}

module.exports = { get, post };
