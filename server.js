'use strict';

const express = require('express');
const multer = require('multer');

const home = require('./routes/home.js');
const signup = require('./routes/signup.js');
const login = require('./routes/login.js');
const createCat = require('./routes/createCat.js');
const catPics = require('./routes/catPics.js');
const userProfile = require('./routes/userProfile.js');
const catPage = require('./routes/catPage.js');

const cookieChecker = require('./middleware/cookieChecker.js');
const checkAuth = require('./middleware/checkAuth.js');

const server = express();

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();
const upload = multer();

const logout = require('./routes/logout.js');

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.urlencoded({ extended: false }));
server.use(cookieChecker);

const staticHandler = express.static('public');
server.use(staticHandler);

server.get('/', checkAuth, home.get);

server.get('/signup', signup.get);
server.post('/signup', signup.post);

server.get('/login', login.get);
server.post('/login', login.post);

server.post('/logout', logout.post);

server.get('/createCat', createCat.get);
server.post('/createCat', upload.single('avatar'), createCat.post);

server.get('/user/:id/profile', checkAuth, userProfile.get);
server.get('/cats/:id/avatar', checkAuth, catPics.get);

server.get('/cats/:id', checkAuth, catPage.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
