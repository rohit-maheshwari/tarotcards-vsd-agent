const express = require('express');
const router = express.Router();
const Card = require('../../models/CardSchema');

router.post('/card/add', async (req, res) => {
    console.log('Handling /card/add')
    try {
        const { cardName, cardQuestions } = req.body;
        const card = await Card.findOne({cardName: cardName, cardQuestions: cardQuestions});
        if (!card) {
            const newCard = new Card({
                cardName: cardName,
                cardQuestions: cardQuestions
            })
            const response = await newCard.save()
            if (response) {
                res.status(200).json({
                    message: `Card successfully added`
                })
            } else {
                res.status(400).json({
                    message: `Something went wrong`
                })
            }
        } else {
            res.status(400).json({
                message: "Card already exists"
            })
        }
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
        message: "error"
        }
    )}
});


module.exports = router;
