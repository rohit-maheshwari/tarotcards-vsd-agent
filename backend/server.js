const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Item = require('./models/Item');

const cors = require('cors');
const recordRoute = require('./routes/record.js');
const getRoute = require('./routes/get.js');

const env = require("../environment.json");
MONGO_URI = env.MONGO_URI;

const PORT =  env.BACKEND.PORT || 8000;

// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use('/', recordRoute);
app.use('/', getRoute);

// Connect to MongoDB

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
  .catch(err => console.log(err));


// TODO: 
// 1. Remove the api calls in server.js and have them in the separate routes (i.e., items.js) 
// 2. Pass the item with actual description and cards by changing the body (-d) below
// curl -X POST -d '{"time_stamp":3, "description":"hi", "cards":[3, 2, 1], "card_responses":["card3", "card2", "card1"], "user_id":3, "session_id":3 }' http://localhost:3000/api/record -H 'Content-Type: application/json'
// 3. clean the database
// 4. change the schema by including all the keys
// 5. launch the api call from the frontend