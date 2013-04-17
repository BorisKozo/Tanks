/*global requirejs require*/

'use strict';

requirejs.config({
    baseUrl: '/Tanks/',
    waitSeconds: 3000,
    shim: {
        'createjs': {
            exports: 'createjs'
        }
    },
    paths: {
        'jquery': 'lib/jquery',
        'createjs': 'lib/createjs.min',
        'lodash': 'lib/lodash'
    }
});

require([
    "createjs",
    "common/game",
    "common/state_manager",
    "app/states/battle"
], function (createjs, game, stateManager, battle) {
    game.initialize({ canvasId: "canvas" });
    stateManager.activate(battle);
    stateManager.start();

});