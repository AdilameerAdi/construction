const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Basic middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: "Server is working!" });
});

// Start server
app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
});