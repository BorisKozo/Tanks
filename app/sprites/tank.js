define(["require", "createjs", "common/math", "./turret"], function (require, createjs, math) {

    var Turret = require("./turret");

    var Tank = function (options) {
        this.options = options.hull;
        this.turret = new Turret(options);

    };

    Tank.prototype.getManifest = function () {
        var result = [];
        result.push(this.options.graphics);
        result = result.concat(this.turret.getManifest());
        return result;
    };

    Tank.prototype.initialize = function (assets) {
        this.hull = new createjs.Bitmap(assets[this.options.graphics.id]);
        this.turret.initialize(assets);

        this.drawing = new createjs.Container();
        this.drawing.addChild(this.hull, this.turret.drawing);

        this.drawing.regX = this.options.centerX;
        this.drawing.regY = this.options.centerY;

        this.turret.drawing.x = this.options.turretAxisX;
        this.turret.drawing.y = this.options.turretAxisY;

        this.drawing.x = 200;
        this.drawing.y = 200;
    };

    Tank.prototype.update = function () {
        this.turret.update();
    };

    Tank.prototype.rotateHullRight = function () {
        this.drawing.rotation = math.incMod(this.drawing.rotation, this.options.rotationSpeed, 360);
        this.turret.rotateHull();
    };

    Tank.prototype.rotateHullLeft = function () {
        this.drawing.rotation = math.incMod(this.drawing.rotation, -this.options.rotationSpeed, 360);
        this.turret.rotateHull();
    };

    Tank.prototype.rotateTurretRight = function () {
        this.turret.rotateTurretRight();
    };

    Tank.prototype.rotateTurretLeft = function () {
        this.turret.rotateTurretLeft();
    };

    Tank.prototype.moveForward = function () {
        var angle = math.degToRad(this.drawing.rotation);
        this.drawing.x += Math.sin(angle);
        this.drawing.y -= Math.cos(angle);
    };

    Tank.prototype.moveBackward = function () {
        var angle = math.degToRad(this.drawing.rotation);
        this.drawing.x -= Math.sin(angle);
        this.drawing.y += Math.cos(angle);
    };

    Tank.prototype.fire = function () {
        return this.turret.fire({
            angle: this.drawing.rotation,
            x: this.drawing.x,
            y: this.drawing.y,
            speed: 20
        });
    };

    return Tank;
});