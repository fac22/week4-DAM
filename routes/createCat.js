'use strict';

const model = require('../database/model.js');

function get(request, response) {
  const html = /* html */ `
      <h1>Create your cat 🐈 </h1>
      <form enctype="multipart/form-data" action="/createCat" method="POST">
        <label for="catName">name your cat</label>
        <input type="text" name="catName" id="catName" />

        
        <label for="avatar">Profile picture</label>
        <input type="file" id="avatar" name="avatar">
        
        <button type="submit">submit</button>
      </form>
    </form>
      
  `;
  response.send(html);
}

function post(request, response) {
  const user = request.session;
  console.log('i am on the create Cat page 🐈 ');
  const file = request.file;
  const { catName } = request.body;

  console.log(file);
  model
    .createCat(user.id, catName, file.buffer)
    .then(() => response.redirect('/'));
}

module.exports = { get, post };
