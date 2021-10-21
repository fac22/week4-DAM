'use strict';

const model = require('../database/model.js');

function get(req, res) {
  const users = req.session;

  //   const html = model
  //     .getCats()
  //     .then((cats) => console.log(cats, 'what cats are'))
  //     .then((cats) => cats.user_id)
  //     .then((cats) =>
  //       cats
  //         .map((cat) => {
  //           return /* html */ `
  //           <li>
  //             <h3><a href="/cats/${cat.id}">${cat.name}</a></h3>
  //             <a href="/cats/${cat.id}">
  //               <img src="/cats/${cat.id}/avatar" alt="Picture of ${cat.name}" />
  //           </li>
  //         `;
  //         })
  //         .join('')
  //     )
  //     .then((page) =>
  //       res.send(/* html */ `
  //     <div>
  //           <form action="/logout" method="POST">
  //             <button id="logoutBtn">Log out</button>
  //           </form>
  //         </div>
  // <h2>Here are all the cats we have, ${users.username}!</h2>
  // <a href='/createCat'>You can add your own here! 🐈</a>
  // <a href='/user/${users.id}/profile'>Visit your profile</a>

  // <ul>
  //   ${page}
  // </ul>
  // `)
  //     );

  // else {
  // response.send(/* html */ `
  // <h2>You shouldn't be seeing this. Not sure how you got here 🤔 You need to <a href="/login">login</a> first!</h2>
  // `);
  // }

  const html = /* html */ `
  <h1>Welcome to your profile ${users.username}</h1>
  <div>

  </div>

  `;

  model.getProfile(req.params.id).then((user) => {
    // console.log(user.id, 'user.id result ');
    model.getUserCats().then((cats) => console.log(cats, '<---- getUserCats'));

    res.send(html);
  });
}

module.exports = { get };
