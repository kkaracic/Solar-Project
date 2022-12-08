function irradiance(Latitude) {

    function toRad(angle) {
        return angle * Math.PI * (1 / 180);
    }





    var delta, A, k;
    for (var i = 1; i <= 365; i++) {
        //first we calculate delta angle for every day of the year
        delta = toRad(23.45 * Math.sin(toRad(360 * (284 + i) / 365)));
        //now we need also to calculate coeficients "A" and "k" also for every day of the year
        //these are crucial for calculating direct irradiance
        A = 1160 + 75 * Math.sin(toRad(360 * (i - 275) / 365));
        k = 0.174 + 0.035 * Math.sin(toRad(360 * (i - 100) / 365));
        //now we calculate the sunset angle so we can integrate
        sunset_angle = Math.abs(-Math.acos(-Math.tan(delta) * Math.tan(toRad(Latitude))));

    }

    // console.log(delta);
}