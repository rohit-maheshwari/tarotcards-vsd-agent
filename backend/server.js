const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');
const homeRoute = require('./routes/home.js');
const recordRoute = require('./routes/record.js');
const getRoute = require('./routes/get.js');
const deleteRoute = require('./routes/delete.js');
const verifyRoute = require('./routes/verify.js');

const env = require("../src/environment.json");
const MONGO_URI = env.MONGO_URI || "";
// MONGO_URI = process.env.MONGO_URI || "";

const PORT =  env.BACKEND.PORT || 8000;
// PORT = process.env.PORT || process.env.BACKEND_PORT || 8000;

// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use('/api/', homeRoute);
app.use('/api', recordRoute);
app.use('/api', verifyRoute);
app.use('/api', getRoute);
app.use('/api', deleteRoute);


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