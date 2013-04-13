define(["require", "createjs", "common/game", "common/state", "common/loader", "common/sprite_list", "common/input", "./../sprites/tank"],
    function (require, createjs, game, State, loader, SpriteList, input) {
    var Tank = require("./../sprites/tank");

    var battle = new State();

    battle.setup = function () {
        battle.sprites = new SpriteList();
        battle.player = new Tank();
        battle.sprites.add(battle.player, "player");
        battle.shells = new SpriteList();
    };

    battle.onLoad = function (deferred) {
        battle.sprites.load(deferred, game.stage);
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