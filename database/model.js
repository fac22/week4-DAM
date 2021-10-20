'use strict';

const db = require('./connection.js');

function createUser(username, email, hash) {
  const INSERT_USER = `
  INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
  RETURNING id, email, username
  `;
  return db
    .query(INSERT_USER, [username, email, hash])
    .then((result) => result.rows[0]);
}

function getUser(email) {
  const SELECT_USER = `
      SELECT id, email, password, username FROM users WHERE email=$1
      `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function getCats() {
  const SELECT_CATS = /* sql */ `
  SELECT name, picture, users.username AS username, to_char(cats.created_at, 'DD Mon YYYY') AS created_at FROM cats JOIN users ON users.id = cats.user_id
  `;
  return db.query(SELECT_CATS).then((result) => result.rows);
}

function createSession(sid, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid`;
  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

function getSession(sid) {
  const SELECT_SESSION = `SELECT data FROM sessions WHERE sid=$1`;
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

module.exports = { createUser, getUser, getCats, createSession, getSession };
