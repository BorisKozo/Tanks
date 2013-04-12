define(['require', 'easel', 'lodash', './state_manager'], function (require, createjs, _) {

    var stateManager = require('./state_manager');
    var loadQueue = new createjs.LoadQueue(true);
    loadQueue.loaded = true;

    var loader = {
        loadManifest: function (manifest, callback) {
            var loadListener, waitListener;
            _.forEach(manifest, function (item) {
                if (item.src) {
                    item.src = require.toUrl(item.src);
                }
            });

            if (loadQueue.loaded) {
                loadListener = loadQueue.addEventListener("complete", function () {
                    var i = 0, length = manifest.length, result = {};
                    for (i = 0; i < length; i += 1) {
                        result[manifest[i].id] = loadQueue.getResult(manifest[i].id);
                    }
                    loadQueue.removeEventListener("complete", loadListener);
                    callback(result);
                });
                loadQueue.loadManifest(manifest);
            } else {
                waitListener = loadQueue.addEventListener("complete", function () {
                    loadQueue.removeEventListener("complete", waitListener);
                    setTimeout(loader.loadManifest, 0, manifest, callback);
                });
            }

        }
    };

    return loader;
})