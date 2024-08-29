const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    cuisine: {type: String, required: true},
    rating: {type: Number, required: true},
    image: {type: String, required: true},
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;