const fs = require("fs");
const file = fs.readFileSync("ekvator.txt");

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

console.log(objects);