define(["require", "easel", "common/game", "common/state", "common/loader", "common/sprite_list", "common/input", "./../sprites/tank"], function (require, createjs, game, State, loader, SpriteList, input) {
    var Tank = require("./../sprites/tank");

    var battle = new State();

    battle.setup = function (options) {
        battle.sprites = new SpriteList();
        battle.sprites.add(new Tank(),"tank");
    }

    battle.onLoad = function (deferred) {
        battle.sprites.load(deferred, game.stage);
    }

    battle.update = function (delta) {
        if (input.pressed("right")) {
            battle.sprites.at("tank").drawing.x += 1;

        }
    }
    return battle;
});