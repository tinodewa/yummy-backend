var express = require('express');
var router = express.Router();
const Payment = require('../models/payment');

//create payment
router.post('/', async (req, res) => {
    try {
        let payment = new Payment({
            order_id: req.body.order_id,
            payment_method: req.body.payment_method,
            amount: req.body.amount,
            payment: req.body.payment_status,
            created_at: req.body.created_at
        });
        payment = await payment.save();
        res.send(payment);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all payments
router.get('/', async (req, res) => {
    const payments = await payment.find();
    res.send(payments);
});

//get single payment
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).send('Payment not found');
        }
        res.json(payment);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//update payment
router.put('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, {
            order_id: req.body.order_id,
            payment_method: req.body.payment_method,
            amount: req.body.amount,
            payment: req.body.payment_status,
            created_at: req.body.created_at
        }, { new: true });
        if (!payment) {
            return res.status(404).send('Payment not found');
        }

        res.send(payment);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//delete payment
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndRemove(req.params.id);
        if (!payment) {
            return res.status(404).send('Payment not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
