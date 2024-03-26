const mongoose = require('mongoose');

// TODO: Figure out the schema of the item that we want to insert to the database
const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Item', ItemSchema);
