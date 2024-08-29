const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    order_id: {type: Number, required: true},
    payment_method: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true},
    created_at: {type: Date, required: true},
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;