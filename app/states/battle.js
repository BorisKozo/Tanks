define(["require", "createjs", "common/game", "common/state", "common/loader", "common/sprite_list", "common/input", "common/collision_manager",
    "./../sprites/tank", "./../sprites/barrel", "./../sprites/shell",
    "./../data/tanks/t72_tank", "./../data/scenery/barrel32", "./../data/effects/explosion", ],
    function (require, createjs, game, State, loader, SpriteList, input, CollisionManager) {
        var t72 = require("./../data/tanks/t72_tank");
        var barrel32 = require("./../data/scenery/barrel32");
        var fireExplosion = require("./../data/effects/explosion");

        var Tank = require("./../sprites/tank");
        var Barrel = require("./../sprites/barrel");
        var Shell = require("./../sprites/shell");

        var battle = new State();

        battle.setup = function () {
            battle.sprites = new SpriteList();
            battle.player = new Tank(t72);
            battle.sprites.add(battle.player, "player");

            battle.targets = new SpriteList();
            battle.targets.add(new Barrel(barrel32), "barrel");

            battle.shells = new SpriteList();
            input.preventDefaultKeys(["right", "left", "up", "down"]);

            battle.collisionManager = new CollisionManager();
            battle.collisionManager.register(Barrel.prototype.type, Shell.prototype.type, CollisionManager.colliders.circlePoint);
        };

        battle.onLoad = function (deferred) {
            var manifest;
            manifest = State.mergeManifest([], t72.hull, t72.turret, t72.gun, barrel32, fireExplosion);
            loader.loadManifest(manifest, function (assets) {
                battle.sprites.initialize(assets);
                battle.targets.initialize(assets);
                battle.player.drawing.x = 200;
                battle.player.drawing.y = 200;
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
        return battle;
    });