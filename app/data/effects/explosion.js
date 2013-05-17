define([], function () {
    return {
        frames: {
            width: 128,
            height: 128,
            regX: 64,
            regY: 64
        },
        animations: {
            explode: [0, 31]
        },
        graphics: {
            fireExplosion: { id: "fireExoplosion", src: "assets/images/explosion.png" }
        },
        sounds: {
            explosion: { id: "explode1", src: "assets/sounds/explode1.ogg" }
        }
    };
});