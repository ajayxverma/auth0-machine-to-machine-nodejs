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
