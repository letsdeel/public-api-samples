# Create IC fixed rate sample app

Create IC fixed rate sample app showcases how a web application split into 2 projects can interact with Deel's API to create a contract, sign a contract and invite a contractor.

The app has 2 projects:
- client: Front end application created using [Create React App](https://create-react-app.dev/) 
- server: Backend using Node.JS [Express](https://expressjs.com/) framework.

## Sample features
### Create a contract
This page showcases how to create a IC fixed-rate contract. It presents you all of [required fields](https://developer.deel.com/reference/createcontract) to make the API call sucessfully. Once all fields are populated click **`Create contract`** button and if the call is sucessfull and alert will be displayed with the Contract ID so you can use for signing and inviting a contractor.

- [Guide](https://developer.deel.com/docs/create-contract-fixed-rate)
- [Developer reference](https://developer.deel.com/reference/createcontract)

### Sign a contract
This page showcases how to sign a contract that was previously created. It presents you all of [required fields](https://developer.deel.com/reference/signcontract) to make the API call sucessfully. Once all fields are populated click **`Sign contract`** button and if the call is sucessfull an alert will be displayed

- [Guide](https://developer.deel.com/docs/sign-contract)
- [Developer reference](https://developer.deel.com/reference/signcontract)

### Invite a contractor
This page showcases how to invite a contractor to sign a contract that was previously signed. It presents you all of [required fields](https://developer.deel.com/reference/invitetosigncontract) to make the API call sucessfully. Once all fields are populated click **`Sign contract`** button and if the call is sucessfull an alert will be displayed

- [Guide](https://developer.deel.com/docs/invite-contractor)
- [Developer reference](https://developer.deel.com/reference/invitetosigncontract)

## Prerequisites
- A Deel API Token. You can generate a new token following [this tutorial](https://developer.deel.com/docs/api-tokens-1).
- [Node.js](https://nodejs.org/en/download/package-manager) v18+

## Environment variables
- **`API_HOST`** - Deel API URL that is used by application.
  - By default, we're using https://api-sandbox.demo.deel.com
- **`API_TOKEN`** - Deel API Token mentioned in Prerequisites.
  - The token should be generated in the same environment used by **`API_HOST`**

## Installing the dependencies
After you have configured your Docusign settings and integration, you can begin installing the dependencies on your local machine.

1. If you do not already have Node.js installed on your computer, install it from the [Node.js](https://nodejs.org/en) website. 
2. Open up a command-line window and navigate to to the sample folder **`cd samples/list-people/`**
3. Run **`npm install`**
4. Then run **`npm run setup`**

## Configure environment variables
- Save API Token generated to **`API_TOKEN`** in **`/server/.env`**

## How to run the project locally
### Manual
1. Navigate to project folder: **`cd samples/create-ic-fixed-rate-contract/`**
2. Navigate to the client folder with **`cd client`** and run **`npm run start`**
3. Navigate to the server directory with **`cd ../server`** and run **`npm run start`**
4. A browser should open automatically at http://localhost:3098

### Using scripts
1. Navigate to the application folder: **`cd create-ic-fixed-rate-contract`**
3. Run **``npm run start``**
4. A browser should open automatically at http://localhost:3098

## Code samples
Performing `POST` **`/rest/v2/contracts`** request to create new contract
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

Performing `POST` **`/rest/v2/contracts/:id/signatures`** request to sign a contract
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