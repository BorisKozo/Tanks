define(['lodash', "common/game"], function (_, game) {
    var collisionManager = {

        checkCollisions: function (colidablesGameEntities, collidingGameEntities) {
            var thingsToAddToStage = [];
            _.forEach(colidablesGameEntities, function (collidableGameEntity) {

                collidingGameEntities.each(function (collidingGameEntity) {
                    var collided = collidableGameEntity.intersectWithMe(collidingGameEntity);
                    if (collided) {
                        //TODO we should add some pyrotechnics manager that will handle all the explosions.
                        var collisionEffects = collidableGameEntity.collide(collidingGameEntity);
                        thingsToAddToStage = thingsToAddToStage.concat(collisionEffects);
                    }
                });

            });

            _.forEach(thingsToAddToStage, function(entityToAdd){
                game.stage.addChild(entityToAdd);
            })
        }
    };

    return collisionManager;
});