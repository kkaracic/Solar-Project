function irradiance(Latitude) {

    //declaring an array with delta angles for every day of the year
    var delta = [];
    for (var i = 1; i <= 365; i++) {
        delta.push(23.45 * Math.sin(Math.PI * 360 * (284 + i) / (365 * 180)));
    }

    console.log(delta);
}