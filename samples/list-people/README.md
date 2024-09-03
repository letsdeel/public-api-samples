# Show People Data sample

List people and details data sample app showcases how a web application split into 2 projects can interact with Deel's API to retrieve a list of people and showing the details of a specific person.
The app has 2 projects:
- client: Front end application created using [Create React App](https://create-react-app.dev/) 
- server: Backend using Node.JS [Express](https://expressjs.com/) framework.

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
1. Navigate to project folder: **`cd samples/list-people/`**
2. Navigate to the client folder with **`cd client`** and run **`npm run start`**
3. Navigate to the server directory with **`cd ../server`** and run **`npm run start`**
4. A browser should open automatically at http://localhost:3098

### Using scripts
1. Navigate to the application folder: **`cd sampes/list-people/`**
2. Navigate to the server folder: **`cd server`**
3. Run **``npm run start``**
4. A browser should open automatically at http://localhost:3098

## Code samples
Performing `GET` **`rest/v2/people`** request to retrieve list of people on the backend.
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

Performing `POST` **`rest/v2/people/:id`** request to create a new contract.
```javascript
const getHeaders = () => ({
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json'
});
app.post('/api/contracts', async (req, res) => {
    const payload = {
        data: {
            ...
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
