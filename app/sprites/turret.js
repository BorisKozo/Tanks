define(["require", "easel", "./aiming_guide"], function (require, createjs) {

    var AimingGuide = require("./aiming_guide");

    var Turret = function (options) {
        this.options = options;
        this.aimingGuide = new AimingGuide({
            minAngle: 5,
            maxAngle: 30,
            aimSpeed: 0.1,
            hullRotationPenalty: 0.5,
            turretRotationPenalty: 1
        });
    };

    Turret.prototype.getManifest = function () {
        var result = [];
        result.push({ id: "tank_turret", src: "assets/images/tank_turret_1.png" });
        return result;
    };

    Turret.prototype.initialize = function (assets) {
        this.turret = new createjs.Bitmap(assets["tank_turret"]);
        this.aimingGuide.initialize();

        this.drawing = new createjs.Container();
        this.drawing.addChild(this.turret, this.aimingGuide.drawing);

        this.drawing.regX = 7;
        this.drawing.regY = 20;

        this.aimingGuide.drawing.x = 8;
        this.aimingGuide.drawing.y = -1;

    };

    Turret.prototype.update = function () {
        this.aimingGuide.update();
    };

    Turret.prototype.rotateTurretRight = function () {
        this.drawing.rotation = (this.drawing.rotation + 1) % 360;
        this.aimingGuide.rotateTurret();
    };

    Turret.prototype.rotateTurretLeft = function () {
        this.drawing.rotation = (this.drawing.rotation - 1) % 360;
        this.aimingGuide.rotateTurret();
    };

    Turret.prototype.rotateHull = function () {
        this.aimingGuide.rotateHull();
    };

    return Turret;
});