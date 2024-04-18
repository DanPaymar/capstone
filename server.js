'use strict';

require('dotenv').config()
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { SERVER_PORT, SESSION_SECRET } = process.env

const { signUp, logIn, sessionCheck, logOut, editProfile, getProfile } = require('./controller.js');

const app = express();

// Middleware to enable CORS
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());
app.use(cors());

app.use(session({
    secret: SESSION_SECRET,
    cookie: { maxAge: (1000 * 60 * 60 * 24 * 7), sameSite: true },
    resave: true,
    saveUninitialized: true
}));

// Define a route to serve the website
app.get('/', (req, res) => {
    // send the main index html file
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



// signup form requests
app.post('/signup', signUp);

// login form requests
app.post('/login', logIn);

// update user account info
app.put('/profile', editProfile);
app.get('/profile', getProfile);
// 
app.get('/sessionCheck', sessionCheck);

app.get('/logout', logOut);

// Start the server
app.listen(SERVER_PORT, () => console.log(`trainspotting on ${SERVER_PORT}`));

