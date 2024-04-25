const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Item = require('./models/Item');

const cors = require('cors');
const recordRoute = require('./routes/record.js');
const getRoute = require('./routes/get.js');
const deleteRoute = require('./routes/delete.js');

// const env = require("../environment.json");
// MONGO_URI = env.MONGO_URI || "";
MONGO_URI = process.env.MONGO_URI || "";

// const PORT =  env.BACKEND.PORT || 8000;
PORT = process.env.BACKEND_PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use('/', recordRoute);
app.use('/', getRoute);
app.use('/', deleteRoute);
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