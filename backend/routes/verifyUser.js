const { OAuth2Client } = require('google-auth-library');
const env = require('../../src/environment.json');
const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
// GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const express = require('express');
const Item = require('../models/Item');
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
    res.status(200).json({ userInfo: userInfo });
});

module.exports = router;