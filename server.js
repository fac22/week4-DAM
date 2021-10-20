'use strict';

const express = require('express');

const home = require('./routes/home.js');
const login = require('./routes/login.js');

const cookieChecker = require('./middleware/cookieChecker.js');
const checkAuth = require('./middleware/checkAuth.js');

const server = express();

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.urlencoded({ extended: false }));
server.unsubscribe(cookieChecker);

const staticHandler = express.static('public');
server.use(staticHandler);

server.get('/', checkAuth, home.get);

server.get('/login', login.get);
server.post('/login', login.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
