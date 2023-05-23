const express = require("express");
const app = express();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "http://localhost:5005/api/contacts/",
  issuerBaseURL: `https://dev-fs6-sm7c.us.auth0.com/`,
});

//app.use(checkJwt);
// This route doesn't need authentication
app.get("/api/public", (req, res) => {
  res.json({
    message: "User not needed to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, (req, res) => {
  res.json({
    message: "You need to be authenticated to see this.",
  });
});

app.get("/authorized", (req, res) => {
  res.send("Secured Resource");
});

const checkScopes = requiredScopes("read:messages");

app.get("/api/private-scoped", checkJwt, checkScopes, (req, res) => {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
