var express = require('express');
var router = express.Router();
const User = require('../models/user');

//create user
router.post('/', async (req, res) => {
    try {
        let user = new User({ 
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address
        });
        user = await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

//get single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
