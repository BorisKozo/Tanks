define([], function (explosion) {
    return {
        frames: {
            width: 128,
            height: 128
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