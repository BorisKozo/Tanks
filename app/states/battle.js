define(["require", "createjs", "common/game", "common/state", "common/loader", "common/sprite_list", "common/input", "./../sprites/tank", "./../data/tanks/t72_tank"],
    function (require, createjs, game, State, loader, SpriteList, input) {
        var Tank = require("./../sprites/tank");
        var t72 = require("./../data/tanks/t72_tank");


        var battle = new State();

        battle.setup = function () {
            battle.sprites = new SpriteList();
            battle.player = new Tank(t72);
            battle.sprites.add(battle.player, "player");
            battle.shells = new SpriteList();
            input.preventDefaultKeys(["right", "left", "up", "down"]);
        };

        battle.onLoad = function (deferred) {
            var manifest;
            manifest = State.mergeManifest([], t72.hull, t72.turret, t72.gun);
            loader.loadManifest(manifest, function (assets) {
                battle.sprites.initialize(assets);
                battle.player.drawing.x = 200;
                battle.player.drawing.y = 200;
                deferred.resolve();
            });
        };

        battle.update = function (delta) {
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