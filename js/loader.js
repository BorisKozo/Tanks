define(['require','easel', 'common/state_manager'], function (require, createjs) {

    var stateManager = require('common/state_manager');

    function _handleComplete() {
        stateManager.start();
    };

    var loader = {
        start: function () {
            var loadQueue = new createjs.LoadQueue(true);
            loadQueue.addEventListener("complete", _handleComplete);
            loadQueue.loadFile({ id: "tank_hull", src: "assets/images/tank_hull_1.png" }, false);
            loadQueue.loadFile({ id: "tank_hull", src: "assets/images/tank_turret_1.png" }, false);
            loadQueue.load();
        }
    };

    return loader;
})