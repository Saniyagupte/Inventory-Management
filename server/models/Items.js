const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  ProductID: { type: String, required: true, unique: true }, // Separate ProductID
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Model using the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
