const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const InputModel = new Schema({
    Latitude: String,
    Longitude: String,
    'N/S': String,
    'W/E': String,
    'Average monthly consumption': String
});

module.exports = mongoose.model('InputModel', InputModel);