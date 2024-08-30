var express = require('express');
var router = express.Router();
const Restaurant = require('../models/restaurant');

//create restaurant
router.post('/', async (req, res) => {
    try {
        let restaurant = new Restaurant({ 
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address
        });
        restaurant = await restaurant.save();
        res.send(restaurant);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all restaurants
router.get('/', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
});

//get single restaurant
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }
        res.json(restaurant);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//update restaurant
router.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }, { new: true });
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        res.send(restaurant);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//delete restaurant
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndRemove(req.params.id);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
