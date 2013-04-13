define(["require", "createjs", "./turret"], function (require, createjs) {

    var Turret = require("./turret");

    var Tank = function (options) {
        this.options = options;
        this.turret = new Turret({
            fireRate: 5
        });

    };

    Tank.prototype.getManifest = function () {
        var result = [];
        result.push({ id: "tank_hull", src: "assets/images/tank_hull_1.png" });
        result = result.concat(this.turret.getManifest());
        return result;
    };

    Tank.prototype.initialize = function (assets) {
        this.hull = new createjs.Bitmap(assets["tank_hull"]);
        this.turret.initialize(assets);

        this.drawing = new createjs.Container();
        this.drawing.addChild(this.hull, this.turret.drawing);

        this.drawing.regX = 9;
        this.drawing.regY = 15;

        this.turret.drawing.x = 9;
        this.turret.drawing.y = 15;

        this.drawing.x = 200;
        this.drawing.y = 200;
    };

    Tank.prototype.update = function () {
        this.turret.update();
    };

    Tank.prototype.rotateHullRight = function () {
        this.drawing.rotation = (this.drawing.rotation + 1) % 360;
        this.turret.rotateHull();
    };

    Tank.prototype.rotateHullLeft = function () {
        this.drawing.rotation = (this.drawing.rotation - 1) % 360;
        this.turret.rotateHull();
    };

    Tank.prototype.rotateTurretRight = function () {
        this.turret.rotateTurretRight();
    };

    Tank.prototype.rotateTurretLeft = function () {
        this.turret.rotateTurretLeft();
    };

    Tank.prototype.moveForward = function () {
        var angle = Math.PI * this.drawing.rotation / 180;
        this.drawing.x += Math.sin(angle);
        this.drawing.y -= Math.cos(angle);
    };

    Tank.prototype.moveBackward = function () {
        var angle = Math.PI * this.drawing.rotation / 180;
        this.drawing.x -= Math.sin(angle);
        this.drawing.y += Math.cos(angle);
    };

    Tank.prototype.fire = function () {
        this.turret.fire();
    };

    return Tank;
});