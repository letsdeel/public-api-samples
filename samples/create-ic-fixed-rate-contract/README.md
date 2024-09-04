# Sample app: Create an individual contractor fixed-rate contract

This app showcases how a web application split into 2 projects can interact with Deel API to create a fixed-rate contract, sign it, and then invite a contractor to sign it.

The app has 2 projects:

- Client: Front-end application created using [Create React App](https://create-react-app.dev/) 
- Server: Backend using Node.JS [Express](https://expressjs.com/)

## Sample features

### Create a contract

This page showcases how to create an individual contractor fixed-rate contract. It only includes the required fields to make the API call successfully. To create a contract:

1. Fill all the fields.
2. Click **Create contract** button.

If the call is successful and alert will be displayed with the Contract ID. Make a note of it, because you can use that to sign the contract and invite the contractor to sign it.

More info:

- [Guide](https://developer.deel.com/docs/create-contract-fixed-rate)
- [Developer reference](https://developer.deel.com/reference/createcontract)

### Sign a contract

This page showcases how to sign a contract that was previously created. It only includes the required fields to make the API call successfully. To sign the contract:

1. Fill all the fields.
2. Click **Sign contract**

If the call is successful an alert will be displayed.

More info:

- [Guide](https://developer.deel.com/docs/sign-contract)
- [Developer reference](https://developer.deel.com/reference/signcontract)

### Invite a contractor

This page showcases how to invite a contractor to sign a contract that you previously signed. It only includes the required fields to make the API call successfully. To invite a contractor:

1. Fill all the fields.
2. Click **Invite contractor**.

If the call is successful, an alert will be displayed.

More info:

- [Guide](https://developer.deel.com/docs/invite-contractor)
- [Developer reference](https://developer.deel.com/reference/invitetosigncontract)

## Prerequisites

- A Deel API Token. You can generate a new token following [this tutorial](https://developer.deel.com/docs/api-tokens-1).
- [Node.js](https://nodejs.org/en/download/package-manager) v18+

## Installing the dependencies

After installing Node.js, you can install the dependencies:

1. Open up a command-line window and navigate to to the sample folder `samples/list-people/`.
2. Run `npm install`.
3. Then run `npm run setup`.

## Environment variables

- `API_HOST` - Deel API URL that is used by application.
  - By default, we're using https://api-sandbox.demo.deel.com.
- `API_TOKEN` - Deel API Token mentioned in [Prerequisites](#prerequisites).
  - The token should be generated in the same environment used by `API_HOST`.

## Configure environment variables

- Save API Token generated to **`API_TOKEN`** in **`/server/.env`**

## How to run the project locally

### Manual

1. Navigate to project folder `samples/create-ic-fixed-rate-contract/client`.
2. Run `npm run start`.
3. Navigate to the server directory with `samples/create-ic-fixed-rate-contract/client` and run `npm run start`.

A browser should open automatically at `http://localhost:3098`.

### Using scripts

1. Navigate to the application folder: `create-ic-fixed-rate-contract`.
2. Run `npm run start`.

A browser should open automatically at `http://localhost:3098`.

## Code samples

Making a `POST` request to `/rest/v2/contracts` to create new contract.

```javascript
const getHeaders = () => ({
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json'
});
app.post('/api/contracts', async (req, res) => {
    const payload = {
        data: {...}
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
```

Making a `POST` request to `/rest/v2/contracts/:id/signatures` to sign a contract.

```javascript
  const payload = {
      data: {
          ...req.body
      }
  };
  const response = await axios.post(`${process.env.API_HOST}/rest/v2/contracts/${req.params.id}/signatures`, payload, {
      headers: getHeaders(),
  });
  res.json(response.data);
```

Performing `POST` **`/rest/v2/contracts/:id/invitations`** request to invite a contractor
```javascript
  const payload = {
      data: {
          ...req.body
      }
  };
  const response = await axios.post(`${process.env.API_HOST}/rest/v2/contracts/${req.params.id}/invitations`, payload, {
      headers: getHeaders(),
  });
  res.json(response.data);
```