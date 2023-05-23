var axios = require("axios").default;

const options = {
  method: "POST",
  url: "https://dev-fs6-sm7c.us.auth0.com/oauth/token",
  headers: { "content-type": "application/json" },
  data: {
    client_id: "8MFnZo4DnJ7iI3NYvMquHX4s5XRh9XuV",
    client_secret:
      "YxHFx6EvF__H5AESpHmyRwlMo8jpJTO_AGyWuthN-sjRUb_pMeAfe-Bv7iijs619",
    audience: "http://localhost:5005/api/contacts/",
    grant_type: "client_credentials",
  },
};

const getToken = async () => {
  try {
    const response = await axios(options);
    console.log("This is the response:", response.data);
    console.log("Access Token:", response.data.access_token);
    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = getToken;
