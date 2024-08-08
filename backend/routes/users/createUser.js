const express = require('express');
const router = express.Router();
const Person = require('../../models/PersonSchema');

router.post('/user/create', async (req, res) => {
    console.log('Handling /user/create')
    try {
        const { firstName, lastName, emailAddress, classStanding, graduationDate } = req.body;
        const person = await Person.findOne({ emailAddress: emailAddress });
        if (!person) { // POST Create a new person
            const newPerson = new Person({
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                // classStanding: classStanding,
                // graduationDate: graduationDate
            });
            await newPerson.save();
            console.log('Person saved successfully');
            res.status(200).json({
                message: "Person saved successfully"
            });
        } else {
            res.status(400).json({
                message: `Email address already in use`
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
