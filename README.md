# Machine-to-Machine Auth0 Integration in Node.js

This guide walks you through the process of implementing machine-to-machine authentication with Auth0 in a Node.js application.

## Prerequisites

- Node.js installed on your machine
- Auth0 account (Sign up at [https://auth0.com](https://auth0.com))

## Getting Started

### Step 1: Set Up an Auth0 Account

- Go to the Auth0 website (https://auth0.com/) and create an account if you don't already have one.
- Once logged in, create a new Auth0 tenant or select an existing one.

### Step 2: Create an Auth0 API

- In the Auth0 Dashboard, go to the "APIs" section and click on "Create API".
- Provide a name for your API, such as "My Node.js API".
- Set the "Identifier" field to a unique URL or URN that represents your API.
- When creating an API in Auth0, the "Identifier" field refers to a unique identifier for your API. This identifier is typically a URL or URI that uniquely identifies your API. It can be any string value that follows a specific format, such as a URL or URN.
- When a client application requests an access token to authenticate and authorize API requests, it includes the audience parameter with the API identifier. Auth0 uses this identifier to validate the requested audience and issue the appropriate access token.
- Optionally, you can configure other settings like signing algorithms, scopes, and permissions as needed.
- Click on "Create" to save your API configuration.

### Step 3: Install Dependencies

- Create a new Node.js project or navigate to your existing project directory.
- Open your terminal and run the following command to initialize a new Node.js project:

```bash

# npm init -y
Install the required dependencies by running the following command:
#npm install express express-jwt jwks-rsa dotenv
```

### Step 4: Set Environment Variables

- Create a new file in your project directory called .env.
  Add the following environment variables to the .env file:
  dotenv

```bash
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_AUDIENCE=YOUR_AUTH0_API_IDENTIFIER
```

Replace YOUR_AUTH0_DOMAIN with your Auth0 tenant domain (e.g., your-domain.auth0.com).
Replace YOUR_AUTH0_API_IDENTIFIER with the identifier you set for your Auth0 API.
Step 5: Create an Express.js Server
Create a new file called server.js and add the following code:

```bash
##Service 1:
#Code

const express = require('express');
const app = express();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
app.use(express.json());

const checkJwt = auth({
  audience: "http://localhost:5005/api/contacts/",
  issuerBaseURL: `https://dev-fs6-sm7c.us.auth0.com/`,
});

#app.use(checkJwt);
#This route doesn't need authentication
app.get("/api/public", (req, res) => {
  res.json({
    message: "User not needed to be authenticated to see this.",
  });
});

#This route needs authentication
app.get("/api/private", checkJwt, (req, res) => {
  res.json({
    message: "You need to be authenticated to see this.",
  });
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


```

Step 6: Creata a another service to fethch the token and access the api

```bash
##Service 2

const express = require("express");
const app = express();
//const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
var request = require("request");
var axios = require("axios").default;
const getToken = require("./middleware");
const port = 3008;

//token = autHeader.split(" ")[1];
//console.log("Thsi is the outer Token vairlable :  ");
//console.log(token.access_token);
/* var options = {
  method: 'GET',
  url: 'http://localhost:3000/authorized',
  headers: {authorization: `Bearer ${token.access_token}`}
}; */

/* axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  }); */

const callApi = async () => {
  const token = await getToken();

  var options = {
    method: "GET",
    url: "http://localhost:3000/api/private",
    headers: { authorization: `Bearer ${token}` },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

callApi();

//console.log("this is on the server", token);
app.listen(port, (req, res) => {
  console.log(`Server is Running at: http://localhost:${port}`);
});

```
