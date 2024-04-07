const express = require('express');
const cors = require('cors');
const {SERVER_PORT} = process.env

const app = express();

// Middleware to enable CORS
app.use(express.static(`$__dirname}/public`))
app.use(express.json());
app.use(cors());

// Define a route to serve the website
app.get('/', (req, res) => {
    // send the main HTML file of website
    // Replace 'index.html' with the actual name of your main HTML file
    res.sendFile(`${__dirname}/public/index.html`);
});


// Start the server
app.listen(SERVER_PORT, () => console.log(`trainspotting on ${SERVER_PORT}`))

