function irradiance(Latitude) {

    function toRad(angle) {
        return angle * Math.PI * (1 / 180);
    }

    function arraysum(niz) {
        var sum = 0;
        for (var i = 0; i < niz.length; i++) sum += niz[i];
        return sum;
    }
    if (Latitude < 0) Latitude *= (-1);
    var delta, A, k, beta_max, fis, C;
    var sigma = toRad(20);
    var ro = 0.4;
    var Irp = [];
    for (var i = 1; i <= 365; i++) {
        //first we calculate delta angle for every day of the year
        delta = toRad(23.45 * Math.sin(toRad(360 * (284 + i) / 365)));
        //now we need also to calculate coeficients "A" and "k" also for every day of the year
        //these are crucial for calculating direct irradiance
        A = 1160 + 75 * Math.sin(toRad(360 * (i - 275) / 365));
        k = 0.174 + 0.035 * Math.sin(toRad(360 * (i - 100) / 365));
        C = 0.095 + 0.04 * Math.sin(toRad(360 * (i - 100) / 365));
        //now it is time to calculate the maximum latitude angle in the day so we can calculate Irradiation
        fis = Math.PI / 2 + delta;
        //now we calculate the maximum angle of solar altitude
        beta_max = Math.PI / 2 - Math.abs(toRad(Latitude)) + delta;
        var Id = [];
        for (var j = 0.01; j <= beta_max; j = j + 0.01) {
            var m = 1 / (Math.sin(j));
            var angles = Math.cos(j) * Math.cos(fis) * Math.sin(sigma) + Math.sin(j) * Math.cos(sigma);
            var difusion = C * (1 + Math.cos(sigma)) / 2;
            var reflection = ro * (Math.sin(j) + C) * (1 - Math.cos(sigma)) / 2;
            Id.push(A * Math.exp(-k * m) * (angles + difusion + reflection));
        }
        //first we need an average Irradiation in W/m^2
        var len = Id.length;
        if (len === 0) len = 1;
        var average_irradiation = arraysum(Id) / len;
        //now we calculate the sunset angle so we can calculate the duration of the day
        var sunset_angle = Math.abs(-Math.acos(-Math.tan(delta) * Math.tan(toRad(Latitude))));
        var dayduration = 2 * (sunset_angle) / toRad(15);
        //now we calculate in-plane irradiation in kWh/m^2 for each day and put it in array
        var dayduration = 0, sunset_angle = 0;
        if (Math.abs(Math.tan(delta) * Math.tan(toRad(Latitude))) >= 1) {
            Irp.push(average_irradiation * 24 / 1000);
            continue;
        }
        else {
            sunset_angle = Math.abs(-Math.acos(-Math.tan(delta) * Math.tan(toRad(Latitude))));
            dayduration = 2 * (sunset_angle) / toRad(15);
        }

        //now we calculate in-plane irradiation in kWh/m^2 for each day and put it in array
        Irp.push(average_irradiation * dayduration / 1000);
    }

    return arraysum(Irp);
    // console.log(delta);
}