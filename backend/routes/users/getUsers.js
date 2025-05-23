const express = require('express');
const Person = require('../../models/PersonSchema');
const router = express.Router();

router.get("/user/getAll", async (req, res) => {
  console.log("Handling GET request for /user/getAll");
  const cursor = Person.find({})
  let people = [];
  for await (const doc of cursor) {
    people.push(doc);
  }
  console.log(people);
  res.status(200).json({ people: people });
});

module.exports = router;