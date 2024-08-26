const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());

const getHeaders = () => ({
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json'
});
app.get('/api/people', async (_, res) => {
    const response = await axios.get(`${process.env.API_HOST}/rest/v2/people`, {
        headers: getHeaders()
    });
    res.json(response.data);
});

app.get('/api/people/:id', async (req, res) => {
    const response = await axios.get(`${process.env.API_HOST}/rest/v2/people/${req.params.id}`, {
        headers: getHeaders()
    });
    res.json(response.data);
});

const port = 3099;
app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});
