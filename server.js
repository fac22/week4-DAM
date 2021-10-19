'use strict';

const express = require('express');

const home = require('./routes/home.js');

const server = express();

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

server.use(cookieParser(process.env.COOKIE_SECRET));

server.use(express.urlencoded({ extended: false }));

const staticHandler = express.static('public');
server.use(staticHandler);

server.get('/', home.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
