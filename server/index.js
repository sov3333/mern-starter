require('dotenv').config()
const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
})

app.get("/coingecko/coins/categories", async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/categories');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

app.get("/coingecko/coins/markets/:id", async (req, res) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${req.params.id}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

app.get("/coingecko/coins/:id", async (req, res) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.id}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
