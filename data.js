const fs = require("fs");
const file = fs.readFileSync("ekvator.txt");
const mongoose = require("mongoose");
const IrrModel = require("./Project_model/Irradiation")

mongoose.connect('mongodb://localhost:27017/sollar-pr', {
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

db.create({ Latitude: "0", Longitude: "0", Irr: "2000" });
console.log(objects);