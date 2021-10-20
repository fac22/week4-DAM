'use strict';

const auth = require('../auth.js');
// const { buildPage } = require('../layout.js');
// const model = require('../database/model.js');

function get(request, response) {
  const title = `facats-signup`;
  const content = /* html */ `
  <h2>Create an account</h2>
  <div>
  <form action="/signup" method="POST">
  <div>
    <label for="username" >Username <span aria-hidden="true">*</span></label>
    <input type="text" id="username" name="username" maxlength="20" placeholder="Type Username" required />
  </div>
  <div>
    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" placeholder="exa@mp.le" required />
    </div>
    <p id="emailError"></p>
    <div>
    <label for="password" >Password <span aria-hidden="true">*</span></label>
    <input type="password" id="password" name="password" minlength="1" placeholder="min 1 characters" required />
    </div>
    <p id="passwordError" class="error"></p>
    <button>Sign up</button>
    <script src="/index.js"></script>
    </form>
    </div>
  `;
  // response.send(buildPage(title, content));
  response.send(content);
}

function post(request, response) {
  const { username, email, password } = request.body;
  console.log(username, email, password);
  // auth
  //   .createUser(username, email, password)
  //   .then(auth.saveUserSession)
  //   .then((sid) => {
  //     response.cookie('sid', sid, auth.COOKIE_OPTIONS);
  //     response.redirect('/');
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     // response.send(
  //     //   buildPage(`Error`, `<h2>An error occurred! Couldn't sign up</h2>`)
  //     // );
  //     response
  //       .status(500)
  //       .send(`Error`, `<h2>An error occurred! Couldn't sign up</h2>`);
  //   });
}

module.exports = { get, post };
