# week4-DAM

Server-side web app to find cool cats and comment on them by Danilo, Alex and Mohamed.

### How to install
- Download the starter files and `cd` in
- Run `npm install` to install all the dependencies
- Run `npm run dev` to start the development server
- Visit http://localhost:3000 to see the workshop app. You can “sign up” by entering an email and a password, which will be saved as a cookie so the server can identify you.

## User Stories

- [ ] As a person interested in cats, I want to be able to create an account so that I can access the site
- [ ] As a coder with cats (or interest in cats), I want to be able to login with my github account so that I can save time signing in
- [ ] As a security conscious person, I want to be able to logout when I have finished using the site so that I have peace of mind that no-one will mess up my profiles
- [ ] As a proud cat owner (or friend of a cat), I want to be able to create a profile for a cat so that I can share it with other users
- [ ] As a cat lover, I want to be able to view the profiles of other cats so that I can be happy at seeing lots of cats
- [ ] As a cat connoisseur, I want to be able to comment on cat profiles to let the world know what I think of a cat
- [ ] As a concerned user, I want to be told when and why something went wrong so that I am not left guessing
- [ ] As a clumsy user, I want to be confident that incorrect data won't get stored so that I don't have to worry about messing up my profile

### Stretch stories

- [ ] As a keen photographer, I want to be able to upload multiple photos of my cat and see them displayed in a gallery so that I can show off the many aspects of my cat
- [ ] As a faltering cat lover, I want to be able to delete my account (and associated comments and cat profiles) so that my life can no longer be brightened by cats

## Database Schema

![image](https://user-images.githubusercontent.com/76691426/137887237-b3f95c90-be9c-4511-a09f-e1057c4230ec.png)

## Login flow

![image](https://user-images.githubusercontent.com/76691426/138062609-1b45ed29-d389-40c2-95bc-c252a4b52d3f.png)

## Bugs and learnings

- Cypress testing
  we must use the module.exports to have the test running on cypress.
  image below:

```javascript
module.exports = (on, config) => {};
```

- order of arguments for functions

  - when calling a function that inserts into the database, we need to make sure we get the order of the functions the right way round
  - had a bug that meant we could sign up but not log in
  - this was because the password has not being inserted into the database in the correct column
  - this was a result of mixing up the arguments passed to the create user function

- formatting timestamps when selecting out of a db
  - `"SELECT to_char(created_at, 'DD Mon YYYY') AS created_at FROM cats"`
  - https://www.postgresql.org/docs/9.1/functions-formatting.html#:~:text=9.8.%20Data%20Type%20Formatting%20Functions

- when deploying to heroku, if your server requires a module, you have to have it as a dependency and not just a dev dependency
  - if you don't, your server will fail to start
