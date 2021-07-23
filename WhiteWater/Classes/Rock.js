"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    class Rock extends WhiteWater.QuadNode {
        constructor(_pos) {
            /*  export let texture: ƒ.TextureImage = new ƒ.TextureImage("invader2.png");
             export let texture2: ƒ.TextureImage = new ƒ.TextureImage("invader2.png");
             export let texture3: ƒ.TextureImage = new ƒ.TextureImage("invader2.png"); */
            if (Math.random() * (WhiteWater.level / 2) <= 3) {
                let scale = new ƒ.Vector2(1, 1);
                super("Rock" + (++Rock.count), _pos, scale);
                let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.asteroid1));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.damageOfContact = WhiteWater.asteroidDamage;
            }
            else if (Math.random() * (WhiteWater.level / 2) <= 8) {
                let scale = new ƒ.Vector2(2, 2);
                super("Rock" + (++Rock.count), _pos, scale);
                let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.asteroid2));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.damageOfContact = WhiteWater.asteroidDamage + WhiteWater.mediumRockDamage;
            }
            else {
                let scale = new ƒ.Vector2(3, 3);
                super("Rock" + (++Rock.count), _pos, scale);
                let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.asteroid3));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.damageOfContact = WhiteWater.asteroidDamage + WhiteWater.bigRockDamage;
            }
        }
        move(_movement) {
            let timeSinceLastFrame = ƒ.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateY(timeSinceLastFrame * _movement);
            this.setRectPosition();
        }
    }
    Rock.count = 0;
    WhiteWater.Rock = Rock;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=Rock.js.map