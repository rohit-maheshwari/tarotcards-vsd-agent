const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

const homeRoute = require('./routes/home.js');

// const recordCardRoute = require('./routes/cards/oldRoutes/addOrUpdateCard.js');
// const getCardsRoute = require('./routes/cards/oldRoutes/getCards.js');
// const deleteCardRoute = require('./routes/cards/oldRoutes/deleteCard.js');

const getUsersRoute = require('./routes/users/getUsers.js');
const createUserRoute = require('./routes/users/createUser.js');
const updateUserRoute = require('./routes/users/updateUser.js');
const deleteUserRoute = require('./routes/users/deleteUser.js');

const createProjectRoute = require('./routes/projects/createProject.js');
const updateProjectRoute = require('./routes/projects/updateProject.js');
const deleteProjectRoute = require('./routes/projects/deleteProject.js');
const addUserToProjectRoute = require('./routes/projects/addUserToProject.js');
const removeUserFromProjectRoute = require('./routes/projects/removeUserFromProject.js')
const addOrUpdateCardInProjectRoute = require('./routes/projects/addOrUpdateCardInProject.js')
const removeCardFromProjectRoute = require('./routes/projects/removeCardFromProject.js')
const getCardsForProjectRoute = require('./routes/projects/getCardsForProject.js')
const getCardForProjectRoute = require('./routes/projects/getCardForProject.js')

const addCardRoute = require('./routes/cards/addCard.js')
const deleteCardRoute = require('./routes/cards/deleteCard.js')
const getCardRoute = require('./routes/cards/getCard.js')
const getAllCardsRoute = require('./routes/cards/getAllCards.js')

const verifyUserRoute = require('./routes/verifyUser.js');

const env = require("../src/environment.json");
const MONGO_URI = env.MONGO_URI || "";
// MONGO_URI = process.env.MONGO_URI || "";

const PORT =  env.BACKEND.PORT || 8000;
// PORT = process.env.PORT || process.env.BACKEND_PORT || 8000;

// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use('/api', homeRoute);
// app.use('/api', recordCardRoute);
app.use('/api', verifyUserRoute);
// app.use('/api', getCardsRoute);
// app.use('/api', deleteCardRoute);
app.use('/api', getUsersRoute);
app.use('/api', createUserRoute);
app.use('/api', updateUserRoute);
app.use('/api', deleteUserRoute);
app.use('/api', createProjectRoute);
app.use('/api', updateProjectRoute);
app.use('/api', deleteProjectRoute);
app.use('/api', addUserToProjectRoute);
app.use('/api', removeUserFromProjectRoute);
app.use('/api', addOrUpdateCardInProjectRoute);
app.use('/api', removeCardFromProjectRoute);
app.use('/api', addCardRoute);
app.use('/api', deleteCardRoute);
app.use('/api', getCardRoute);
app.use('/api', getAllCardsRoute);
app.use('/api', getCardsForProjectRoute);
app.use('/api', getCardForProjectRoute);

// Connect to MongoDB

mongoose.connect(MONGO_URI, {
    autoCreate: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
  .catch(err => console.log(err));