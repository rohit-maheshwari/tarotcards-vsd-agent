const { OAuth2Client } = require('google-auth-library');
const env = require('../environment.json');
const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
// GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const express = require('express');
const axios = require('axios');
const router = express.Router();

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID, 
  }).catch((error) => console.log(error));
  const payload = ticket.getPayload();
  const googleId = payload['sub'];
  const email = payload['email'];
  const name = payload['name'];

  return {googleId: googleId, email: email, name: name};
}

router.get("/verify", async (req, res) => {
    const { idToken } = req.query;
    console.log("Handling GET request for /verify");
    const userInfo = await verify(idToken);
    try {
      const response = await axios.post('http://localhost:8080/api/user/create', {
        name: userInfo.name,
        emailAddress: userInfo.email,
        classStanding: 'not specified yet',
        graduationDate: 'not specified yet'
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })

      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    

    res.status(200).json({ userInfo: userInfo });
});

module.exports = router;