define(["require", "createjs", "common/math", "./aiming_guide", "./shell"], function (require, createjs, math) {

    var AimingGuide = require("./aiming_guide");
    var Shell = require("./shell");

    var Turret = function (options) {
        this.options = options;
        this.aimingGuide = new AimingGuide({
            minAngle: 5,
            maxAngle: 30,
            aimSpeed: 0.2,
            hullRotationPenalty: 0.4,
            turretRotationPenalty: 0.8
        });
    };

    Turret.prototype.getManifest = function () {
        var result = [];
        result.push({ id: "tank_turret", src: "assets/images/tank_turret_1.png" });
        result.push({ id: "fire_sound_1", src: "assets/sounds/tank_firing_1.ogg" });
        return result;
    };

    Turret.prototype.initialize = function (assets) {
        this.turret = new createjs.Bitmap(assets["tank_turret"]);
        this.fireSound = createjs.Sound.createInstance("fire_sound_1");
        
        this.aimingGuide.initialize();

        this.drawing = new createjs.Container();
        this.drawing.addChild(this.turret, this.aimingGuide.drawing);

        this.drawing.regX = 7;
        this.drawing.regY = 20;

        this.aimingGuide.drawing.x = 8;
        this.aimingGuide.drawing.y = -1;

        this.fireCounter = this.options.fireRate;
    };

    Turret.prototype.update = function () {
        this.aimingGuide.update();
        this.fireCounter = math.incMin(this.fireCounter, -0.1, 0);
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

    Turret.prototype.fire = function () {
        if (this.fireCounter > 0) {
            return;
        }
        this.fireCounter = this.options.fireRate;
        this.fireSound.play();
        var shell = new Shell({
            angle: this.drawing.rotation,
            x:100,
            y:100
        });

        return shell;
    }

    return Turret;
});