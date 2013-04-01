define(["easel"], function (createjs) {
    var Tank = function () {
    };

    Tank.prototype.getManifest = function () {
        var result = [];
        result.push({ id: "tank_hull", src: "assets/images/tank_hull_1.png" });
        result.push({ id: "tank_turret", src: "assets/images/tank_turret_1.png" });
        return result;
    }

    Tank.prototype.initialize = function (assets) {
        this.drawing = new createjs.Bitmap(assets["tank_hull"]);
        this.drawing.x = 100;
        this.drawing.y = 100;

    }

    return Tank;
});