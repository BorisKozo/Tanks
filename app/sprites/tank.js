define(["easel"], function (createjs) {
    var Tank = function (options) {
        this.options = options;
    };

    Tank.prototype.getManifest = function () {
        var result = [];
        result.push({ id: "tank_hull", src: "assets/images/tank_hull_1.png" });
        result.push({ id: "tank_turret", src: "assets/images/tank_turret_1.png" });
        return result;
    }

    Tank.prototype.initialize = function (assets) {
        this.hull = new createjs.Bitmap(assets["tank_hull"]);
        this.turret = new createjs.Bitmap(assets["tank_turret"]);
        this.drawing = new createjs.Container();
        this.drawing.addChild(this.hull, this.turret);

        this.drawing.regX = 9;
        this.drawing.regY = 15;

        this.turret.regX = 7;
        this.turret.regY = 20;

        this.turret.x = 9;
        this.turret.y = 15;

        this.drawing.x = 200;
        this.drawing.y = 200;
    }

    Tank.prototype.rotateHullRight = function () {
        this.drawing.rotation = (this.drawing.rotation + 1) % 360;
    }

    Tank.prototype.rotateHullLeft = function () {
        this.drawing.rotation = (this.drawing.rotation - 1) % 360;
    }

    Tank.prototype.rotateTurretRight = function () {
        this.turret.rotation = (this.turret.rotation + 1) % 360;
    }

    Tank.prototype.rotateTurretLeft = function () {
        this.turret.rotation = (this.turret.rotation - 1) % 360;
    }

    Tank.prototype.moveForward = function () {
        var angle = Math.PI * this.drawing.rotation / 180;
        this.drawing.x += Math.sin(angle);
        this.drawing.y -= Math.cos(angle);
    }

    Tank.prototype.moveBackward = function () {
        var angle = Math.PI * this.drawing.rotation / 180;
        this.drawing.x -= Math.sin(angle);
        this.drawing.y += Math.cos(angle);
    }


    return Tank;
});