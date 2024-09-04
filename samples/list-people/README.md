# Sample app: Show people data

This sample app shows how a web application split into 2 projects can interact with Deel API to retrieve a list of people and showing the details of a specific person.

The app has 2 projects:

- client: Front end application created using [Create React App](https://create-react-app.dev/) 
- server: Backend using Node.JS [Express](https://expressjs.com/) framework.

## Prerequisites

- A Deel API token. You can generate a new token following the instructions in [API tokens](https://developer.deel.com/docs/api-tokens-1).
- [Node.js](https://nodejs.org/en/download/package-manager) v18+.

## Installing the dependencies

After installing Node.js and retrieving a valid token, you can install the dependencies:

1. Open a command-line window and navigate to to the sample directory `samples/list-people/`.
2. Run `npm install`.
3. Then run `npm run setup`.

## Environment variables

- `API_HOST` - Deel API URL that is used by application.
  - By default, we're using `https://api-sandbox.demo.deel.com`.
- `API_TOKEN` - Deel API token mentioned in [Prerequisites](#prerequisites).
  - The token should be generated in the same environment used by `API_HOST`.

## Configure environment variables

- Save the API token generated in the variable `API_TOKEN` in `/server/.env`

## How to run the project locally

### Manually

1. Navigate to project directory `samples/list-people/client` and run `npm run start`.
2. Navigate to the server directory with `samples/list-people/client` and run `npm run start`.

A browser should open automatically at `http://localhost:3098`.

### Using scripts

1. Navigate to the application directory `samples/list-people/`.
2. Run `npm run start`.

A browser should open automatically at `http://localhost:3098`.

## Code samples

### `GET` request to `rest/v2/people` to retrieve list of people

```javascript
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
```

### `GET` request to`rest/v2/people/:id` to retrieve the details of a specific person

```javascript
const getHeaders = () => ({
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json'
});
app.get('/api/people/:id', async (req, res) => {
    const response = await axios.get(`${process.env.API_HOST}/rest/v2/people/${req.params.id}`, {
        headers: getHeaders()
    });
    res.json(response.data);
});
```
