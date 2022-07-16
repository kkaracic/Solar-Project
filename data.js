const fs = require("fs");
const file = fs.readFileSync("ekvator.txt");
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

const array = file.toString().split('\r').slice(1);


let objects = []

for (let i = 0; i < array.length; i++) {
    let niz = array[i].split(',');
    objects.push({
        Latitude: niz[0],
        Longitude: niz[1],
        Irr: niz[2]
    });
}

const irr1 = new IrrModel({ Latitude: "100", Longitude: "200", Irradiation: "3001" });
irr1.save().then(item => {
    console.log("DB Item saved --->", item);
}).catch(err => {
    console.log("unable to save to database");
});


console.log(objects);