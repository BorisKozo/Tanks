define(["require", "createjs", "common/math", "./hull", "./turret"], function (require, createjs, math) {

    var Hull = require("./hull");
    var Turret = require("./turret");

    var Tank = function (options) {
        this.options = options;
        this.turret = new Turret(options);
        this.hull = new Hull(options);

    };

    Tank.prototype.initialize = function (assets) {
        this.drawing = new createjs.Container();
        this.tank = new createjs.Container();

        this.turret.initialize(assets);
        this.hull.initialize(assets);

        this.tank.addChild(this.hull.drawing, this.turret.drawing);
        this.drawing.addChild(this.tank);

        this.tank.regX = this.options.hull.centerX;
        this.tank.regY = this.options.hull.centerY;

        this.turret.drawing.x = this.options.hull.turretAxisX;
        this.turret.drawing.y = this.options.hull.turretAxisY;
    };

    Tank.prototype.update = function (delta) {
        this.hull.update(delta);
        this.turret.update(delta);
    };

    Tank.prototype.rotateHullRight = function () {
        this.tank.rotation = math.incMod(this.tank.rotation, this.options.hull.rotationSpeed, 360);
        this.turret.rotateHull();
    };

    Tank.prototype.rotateHullLeft = function () {
        this.tank.rotation = math.incMod(this.tank.rotation, -this.options.hull.rotationSpeed, 360);
        this.turret.rotateHull();
    };

    Tank.prototype.rotateTurretRight = function () {
        this.turret.rotateTurretRight();
    };

    Tank.prototype.rotateTurretLeft = function () {
        this.turret.rotateTurretLeft();
    };

    Tank.prototype.moveForward = function () {
        var angle = math.degToRad(this.tank.rotation);
        this.tank.x += Math.sin(angle);
        this.tank.y -= Math.cos(angle);
    };

    Tank.prototype.moveBackward = function () {
        var angle = math.degToRad(this.tank.rotation);
        this.tank.x -= Math.sin(angle);
        this.tank.y += Math.cos(angle);
    };

    Tank.prototype.fire = function () {
        return this.turret.fire({
            angle: this.tank.rotation,
            x: this.tank.x,
            y: this.tank.y,
            speed: 20
        });
    };

    return Tank;
});