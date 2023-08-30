const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3002;

// Handle CORS for all requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Define a route to proxy API requests
app.get('/api/games', async (req, res) => {
    try {
        const response = await axios.get('https://www.freetogame.com/api/games', {
            params: req.query,
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

// Define a route to proxy individual game details
app.get('/api/game', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Game ID is required' });
    }

    try {
        const response = await axios.get(`https://www.freetogame.com/api/game?id=${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game details' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
