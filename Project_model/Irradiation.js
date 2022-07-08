const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;

const IrrModel = new Schema({
    Latitude: string,
    Longitude: string,
    Irradiation: string
});

module.exports('IrrModel', IrrModel);