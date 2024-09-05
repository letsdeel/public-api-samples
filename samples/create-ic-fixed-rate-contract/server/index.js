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

app.get('/api/data', async (req, res) => {
    const legalEntitiesResponse = await axios.get(`${process.env.API_HOST}/rest/v2/legal-entities`, {
        headers: getHeaders(),
    });

    const teamsReponse = await axios.get(`${process.env.API_HOST}/rest/v2/teams`, {
        headers: getHeaders(),
    });

    const jobTitlesReponse = await axios.get(`${process.env.API_HOST}/rest/v2/lookups/job-titles`, {
        headers: getHeaders(),
    });
    const senioritiesReponse = await axios.get(`${process.env.API_HOST}/rest/v2/lookups/seniorities`, {
        headers: getHeaders(),
    });

    const data = {
        legalEntities: legalEntitiesResponse.data.data,
        teams: teamsReponse.data.data,
        jobTitles: jobTitlesReponse.data.data,
        seniorities: senioritiesReponse.data.data,
    };
    res.json(data);
});

const handleError = (err, res) => {
    console.log(err);
    if (err.isAxiosError) {
        console.log(err.response.data.errors);
        return res.status(err.response?.status ?? 500).json(err.response?.data);
    }
    return res.status(500).json('Something went wrong');
};

app.post('/api/contracts', async (req, res) => {
    const payload = {
        data: {
            start_date: req.body.start_date,
            title: req.body.title,
            type: req.body.type,
            meta: {
                documents_required: false
            },
            compensation_details: {
                frequency: req.body.frequency,
                cycle_end_type: req.body.cycle_end_type,
                payment_due_type: req.body.payment_due_type,
                first_payment: 0,
                notice_period: 0,
                scale: req.body.scale,
                amount: req.body.amount,
                currency_code: req.body.currency_code,
                cycle_end: req.body.cycle_end,
                payment_due_days: req.body.payment_due_days
            },
            client: {
                legal_entity: {
                  id: req.body.legal_entity
                },
                team: {
                  id: req.body.team
                }
            },
            worker: {
                expected_email: req.body.expected_email,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            },
            job_title: {
                id: req.body.job_title
            },
            seniority: {
                id: req.body.seniority
            }
        }
    };
    
    try {
        const response = await axios.post(`${process.env.API_HOST}/rest/v2/contracts`, payload, {
            headers: getHeaders(),
        });
        res.json(response.data.data);
    } catch(err) {
        return handleError(err, res);
    }
});

app.post('/api/contracts/:id/signatures', async (req, res) => {
    try {
        const payload = {
            data: {
                ...req.body
            }
        };
        const response = await axios.post(`${process.env.API_HOST}/rest/v2/contracts/${req.params.id}/signatures`, payload, {
            headers: getHeaders(),
        });
        res.json(response.data);
    } catch(err) {
        return handleError(err, res);
    }
});

app.post('/api/contracts/:id/invitations', async (req, res) => {
    try {
        const payload = {
            data: {
                ...req.body
            }
        };
        const response = await axios.post(`${process.env.API_HOST}/rest/v2/contracts/${req.params.id}/invitations`, payload, {
            headers: getHeaders(),
        });
        res.json(response.data);
    } catch(err) {
        return handleError(err, res);
    }
});

const port = 3099;
app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});
