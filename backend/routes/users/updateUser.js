const express = require('express');
const router = express.Router();
const Person = require('../../models/PersonSchema');

router.put('/user/update', async (req, res) => {
    console.log('Handling /user/update')
    try {
        const { personEmailAddress, firstName, lastName, emailAddress, classStanding, graduationDate } = req.body;
        const person = await Person.findOne({ personEmailAddress: personEmailAddress });
        if (person) {
            const editedPerson = {
                firstName: firstName ? firstName : person.firstName,
                lastName: lastName ? lastName : person.lastName,
                emailAddress: emailAddress ? emailAddress : person.emailAddress,
                // classStanding: classStanding ? classStanding : person.classStanding,
                // graduationDate: graduationDate ? graduationDate : person.graduationDate
            };
            const result = await Person.findOneAndUpdate({ personEmailAddress: personEmailAddress }, { $set: editedPerson }, { new: true });
            if (result) {
                res.status(200).json({
                    message: `User has been updated with new information`});
            } else {
                res.status(400).json({
                    message: "error"
                })
            }
            
        } else { // PUT: Update person information
            res.status(404).json({
                message: `User not found`
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
