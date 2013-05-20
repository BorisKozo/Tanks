define(["require", "createjs", "common/game", "common/state", "common/loader", "common/sprite_list", "common/input", "common/collision_manager", "common/math",
    "./../sprites/tank", "./../sprites/barrel", "./../sprites/shell",
    "./../data/tanks/t72_tank", "./../data/scenery/barrel32", "./../data/effects/explosion", ],
    function (require, createjs, game, State, loader, SpriteList, input, CollisionManager, math) {
        var t72 = require("./../data/tanks/t72_tank");
        var barrel32 = require("./../data/scenery/barrel32");
        var fireExplosion = require("./../data/effects/explosion");

        var Tank = require("./../sprites/tank");
        var Barrel = require("./../sprites/barrel");
        var Shell = require("./../sprites/shell");

        var battle = new State();

        battle.addEventHandlers = function () {
            battle.on("dead:barrel", battle.barrelDead, battle);
        };

        battle.setup = function () {
            battle.sprites = new SpriteList();
            battle.player = new Tank(t72);
            battle.sprites.add(battle.player, "player");

            battle.targets = new SpriteList();
            

            battle.shells = new SpriteList();
            input.preventDefaultKeys(["right", "left", "up", "down"]);

            battle.addEventHandlers();

            battle.collisionManager = new CollisionManager();
            battle.collisionManager.register(Barrel.prototype.type, Shell.prototype.type, CollisionManager.colliders.circlePoint);

        };

        battle.onLoad = function (deferred) {
            var manifest;
            manifest = State.mergeManifest([], t72.hull, t72.turret, t72.gun, barrel32, fireExplosion);
            loader.loadManifest(manifest, function (assets) {
                battle.assets = assets;
                battle.sprites.initialize(assets);
                battle.targets.initialize(assets);
                battle.player.drawing.x = 200;
                battle.player.drawing.y = 200;
                battle.generateBarrel();
                deferred.resolve();
            });
        };

        battle.handleCollision = function () {
            battle.targets.each(function (target) {
                battle.shells.each(function (shell) {
                    battle.collisionManager.collide(target, shell);
                });
            });
        };

        battle.update = function (delta) {
            this.handleCollision();

            battle.targets.update(delta);
            battle.sprites.update(delta);
            battle.shells.update(delta);
            

            if (input.pressed("right")) {
                battle.player.rotateHullRight(delta);
            }

            if (input.pressed("left")) {
                battle.player.rotateHullLeft(delta);
            }

            if (input.pressed("d")) {
                battle.player.rotateTurretRight(delta);
            }

            if (input.pressed("a")) {
                battle.player.rotateTurretLeft(delta);
            }

            if (input.pressed("up")) {
                battle.player.moveForward(delta);
            }

            if (input.pressed("down")) {
                battle.player.moveBackward(delta);
            }

            if (input.pressed("f")) {
                var shell = battle.player.fire();
                if (shell) {
                    battle.shells.add(shell);
                    game.stage.addChild(shell.drawing);
                }
            }

            

        };

        battle.generateBarrel = function () {
            var barrel = new Barrel(barrel32);
            barrel.initialize(battle.assets);
            barrel.drawing.x = math.randomInRange(100, 700);
            barrel.drawing.y = math.randomInRange(100, 500);
            game.stage.addChild(barrel.drawing);
            battle.targets.add(barrel);
        };

        battle.barrelDead = function (explosion) {
            this.sprites.add(explosion);
            battle.generateBarrel();
            game.stage.addChild(explosion.drawing);

        };

        return battle;
    });