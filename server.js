'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
// const { SERVER_PORT } = process.env
const PORT = 4004

const app = express();

// Middleware to enable CORS
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());
app.use(cors());

// Define a route to serve the website
app.get('/', (req, res) => {
    // send the main index html file
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Start the server
app.listen(PORT, () => console.log(`trainspotting on ${PORT}`))

