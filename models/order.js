const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    restaurant_id: {type: Number, required: true},
    status: {type: String, required: true},
    total_amount: {type: Number, required: true},
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true},
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;