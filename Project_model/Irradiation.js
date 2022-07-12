const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;

const IrrModel = new Schema({
    Latitude: String,
    Longitude: String,
    Irradiation: String
});

module.exports('IrrModel', IrrModel);