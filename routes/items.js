var express = require('express');
var router = express.Router();
const Item = require('../models/item');

//create item
router.post('/', async (req, res) => {
    try {
        let item = new Item({
            item_name: req.body.item_name,
            quantity: req.body.quantity,
            price: req.body.price
        });
        item = await item.save();
        res.send(item);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all items
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

//get single item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.json(item);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//update item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, {            
            item_name: req.body.item_name,
            quantity: req.body.quantity,
            price: req.body.price
        }, { new: true });
        if (!item) {
            return res.status(404).send('Item not found');
        }

        res.send(item);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//delete item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndRemove(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
