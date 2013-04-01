define(["require","easel", "common/game","common/state", "common/loader","./../sprites/tank"], function (require, createjs, game, State, loader) {
    var Tank = require("./../sprites/tank");

    var battle = new State();

    battle.setup = function (options) {
        battle.tank = new Tank();
    }

    battle.onLoad = function (deferred) {
        loader.loadManifest(battle.tank.getManifest(), function (assets) {
            battle.tank.initialize(assets);
            game.stage.addChild(battle.tank.drawing);
            deferred.resolve();
        });
    }

    battle.update = function (delta) {
    }
    return battle;
});