define([], function () {
    var twoPi = Math.PI * 2;
    var rd = Math.PI / 180;
    var dr = 180 / Math.PI;
    return {
        // Returns the distance between the point at (x1,y1) to the point at (x2,y2)
        distance: function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        },
        withinDistance: function (x1, y1, x2, y2, distance) {
            return Math.pow(distance, 2) > (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        },
        randomInRange: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        twoPI: twoPi,
        radToDeg: function (rad) {
            return rad * dr;
        },
        degToRad: function (deg) {
            return deg * rd;
        }
    };
});