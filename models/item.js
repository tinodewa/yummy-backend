const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    order_id: {type: Number, required: true},
    item_name: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;