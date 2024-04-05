const express = require('express');
const cors = require('cors');
const {SERVER_PORT} = process.env

const app = express();

// Middleware to enable CORS
app.use(express.json());
app.use(cors());

// Define a route
app.get('/public/index.html', (req, res) => {
    res.send('');
});

// Start the server
app.listen(SERVER_PORT, () => console.log(`trainspotting on ${SERVER_PORT}`))

