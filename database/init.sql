BEGIN;

DROP TABLE IF EXISTS users, sessions, cats, comments CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);

CREATE TABLE cats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    picture BYTEA NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    cat_id INTEGER REFERENCES cats(id) ON DELETE CASCADE,
    text_content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, username) VALUES
(
  'test@gmail.com',
  '$2a$10$vwhmLeePYHh6ayoIt42wKuelQ/JaQClYWYsFjr0V25qLLBowiZ.x.',
  'testington'
), (
  'eviltest@gmail.com',
  '$2a$10$vwhmLeePYHh6ayoIt42wKuelQ/JaQClYWYsFjr0V25qLLBowiZ.x.',
  'eviltestington'
);

INSERT INTO cats ( user_id, name  ) VALUES
  (1,  'Keanu'),
  (1,  'Ms. Fluff'),
  (2,  'Evil Keanu'),
  (2,  'Evil Ms. Fluff');

  INSERT INTO comments (user_id, cat_id, text_content) VALUES
(
  1,
  1,
  'testington comments on Keanu'
), (
  1,
  3,
  'testington comments on Evil Keanu'
),
(
  2,
  1,
  'eviltestington comments on Keanu'
),
(
  2,
  4,
  'eviltestington comments on Evil Ms. Fluff'
);

COMMIT;