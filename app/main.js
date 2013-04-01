/*global requirejs*/
'use strict';

requirejs.config({
    baseUrl: '/',
    waitSeconds: 3000,
    shim: {
        'preload':{
        },
        'easel': {
            exports: 'createjs',
            deps:['preload']
        }
    },
    paths: {
        'jquery': 'lib/jquery',
        'easel': 'lib/easeljs-0.6.0.min',
        'preload': 'lib/preloadjs-0.3.0.min',
        'lodash': 'lib/lodash'
    }
});

require([
    "easel",
    "common/game",
    "common/state_manager",
    "app/states/battle"
], function (createjs, game,stateManager, battle) {
    game.initialize({ canvasId: "canvas" });
    stateManager.activate(battle);
    stateManager.start();

});