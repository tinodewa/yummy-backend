var express = require('express');
var router = express.Router();
const Order = require('../models/order');

//create order
router.post('/', async (req, res) => {
    try {
        let order = new Order({
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id,
            status: req.body.status,
            total_amount: req.body.total_amount,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
        });
        order = await order.save();
        res.send(order);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all orders
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

//get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.json(order);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//update order
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {            
            user_id: req.body.user_id,
            restaurant_id: req.body.restaurant_id,
            status: req.body.status,
            total_amount: req.body.total_amount,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
        }, { new: true });
        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.send(order);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//delete order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
