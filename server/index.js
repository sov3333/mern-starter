require('dotenv').config()
const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
})

app.get("/api/external", async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/ping');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
