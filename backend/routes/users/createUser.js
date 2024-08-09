const express = require('express');
const router = express.Router();
const Person = require('../../models/PersonSchema');

router.post('/user/create', async (req, res) => {
    console.log('Handling /user/create')
    try {
        const { name, emailAddress, classStanding, graduationDate } = req.body;
        console.log(name, emailAddress, classStanding, graduationDate)
        const person = await Person.findOne({ emailAddress: emailAddress });
        if (person == null) { // POST Create a new person
            const newPerson = new Person({
                name: name,
                emailAddress: emailAddress,
                classStanding: classStanding,
                graduationDate: graduationDate
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
