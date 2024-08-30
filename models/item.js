const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_name: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;