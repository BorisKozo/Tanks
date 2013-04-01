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
    "js/loader"
], function (createjs, game, loader) {
    game.initialize({canvasId:"canvas"});
    loader.start();
    //var circle = new createjs.Shape();
    //circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    ////Set position of Shape instance.
    //circle.x = circle.y = 50;
    ////Add Shape instance to stage display list.
    //game.stage.addChild(circle);
    ////Update stage will render next frame
    //game.stage.update();
});