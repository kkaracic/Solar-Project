const express = require("express");
var bodyParser = require('body-parser');
const app = express();
var path = require("path");
const mongoose = require("mongoose");
const IrrModel = require("./Project_model/Irradiation")

mongoose.connect('mongodb://localhost:27017/Irrbase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Pages'));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public/')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log("Hello from the other side");
    res.render('home');
})

app.get('/questions', (req, res) => {
    res.render('questions');
})

app.get('/investor', (req, res) => {
    res.render('investor_calculation');
})

app.post('/resultsInv', async (req, res) => {
    //console.log(LatLong.slat);
    const apiResponse = JSON.parse(JSON.stringify(req.body));
    var iLatitude = apiResponse.Latitude;
    var iLongitude = apiResponse.Longitude;
    console.log(parseInt(req.body.slat));
    console.log(parseInt(req.body.slon));
    if (apiResponse.N_or_S === 'South') {
        iLatitude = iLatitude * (-1);
        iLatitude = iLatitude.toString();
    }
    if (apiResponse.W_or_E === 'West') {
        iLongitude = iLongitude * (-1);
        iLongitude = iLongitude.toString();
    }
    const iModel = await IrrModel.find({ $and: [{ Latitude: iLatitude }, { Longitude: iLongitude }] });
    console.log(iModel);
    console.log(iModel[0].toObject().Irradiation);
    const iData = {
        Latitude: iLatitude,
        Longitude: iLongitude,
        Irradiation: iModel[0].toObject().Irradiation.toString(),
        Average_monthly_consumption: apiResponse.Average_monthly_consumption,
    }
    res.render('resultsInv', { iData: iData });

})

app.listen(3000, () => {
    console.log("Serving on the port 3000");
})