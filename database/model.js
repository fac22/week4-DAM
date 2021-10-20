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

function createSession(sid, json) {
  const INSERT_SESSION = ` INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid`;
  return db
    .query(INSERT_SESSION, [sid, json])
    .then((response) => response.rows[0].sid);
}

module.exports = { createUser, createSession };
