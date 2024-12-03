const express = require('express');
const Person = require('../../models/PersonSchema');
const router = express.Router();

router.get("/user/get", async (req, res) => {
    console.log("Handling GET request for /user/get");
    const { emailAddress } = req.query;
    try {
        const person = await Person.findOne({emailAddress: emailAddress})
        console.log(person)
        if (person !== null) {
            res.status(200).json(person);
            console.log(person)
        } else {
            res.status(404).json({
                message: `Person not found`
            });
        }
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
            message: "error"
        })
    }
  
});

module.exports = router;