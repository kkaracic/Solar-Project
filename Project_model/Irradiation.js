const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/sollar-pr', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const IrrModel = new Schema({
    Latitude: String,
    Longitude: String,
    Irradiation: String
});

var Irr = db.model('IrrModel', IrrModel);

//module.exports('IrrModel', IrrModel);