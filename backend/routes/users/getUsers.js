const express = require('express');
const Person = require('../../models/PersonSchema');
const router = express.Router();

router.get("/user/get", async (req, res) => {
  console.log("Handling GET request for /user/get");
  const cursor = Person.find({})
  let people = [];
  for await (const doc of cursor) {
    people.push(doc);
  }
  console.log(people);
  res.status(200).json({ people: people });
});

module.exports = router;