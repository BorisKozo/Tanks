define([], function () {
    return {
        minAngle: 5,
        maxAngle: 30,
        aimSpeed: 0.1,
        hullRotationPenalty: 0.4,
        turretRotationPenalty: 0.8,
        fireRate: 5,
        dispersionOnFire: 15,
        fireSound: { id: "fire_sound_1", src: "assets/sounds/tank_firing_1.ogg" }
    };
});