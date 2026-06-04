const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());

const getHeaders = () => ({
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json',
    'X-Version': process.env.API_VERSION || '2026-01-01'
});
app.get('/api/people', async (_, res) => {
    const response = await axios.get(`${process.env.API_HOST}/rest/people`, {
        headers: getHeaders()
    });
    res.json(response.data);
});

app.get('/api/people/:id', async (req, res) => {
    const response = await axios.get(`${process.env.API_HOST}/rest/people/${req.params.id}`, {
        headers: getHeaders()
    });
    res.json(response.data);
});

const port = 3099;
app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});
