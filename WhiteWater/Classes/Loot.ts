namespace WhiteWater {
    import ƒ = FudgeCore;
    export class Loot extends QuadNode {
        private static count: number = 0;
        public worthOfLoot: number;

        constructor(_pos: ƒ.Vector2) {
            /* let texture: ƒ.TextureImage = new ƒ.TextureImage("invader.png");
            let texture2: ƒ.TextureImage = new ƒ.TextureImage("invader.png"); */
            if (level > 5 && Math.random() <= (bigLootPropability)) {
                let scale: ƒ.Vector2 = new ƒ.Vector2(2, 2);
                super("Loot" + (++Loot.count), _pos, scale);
                let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureBigLoot));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.worthOfLoot = reward * rewardFactor;
            } else {
                let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
                super("Loot" + (++Loot.count), _pos, scale);
                let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), textureSmallLoot));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.worthOfLoot = reward;
            }
        }

        public move(_movement: number): void {
            let timeSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateY(timeSinceLastFrame * _movement);
            this.setRectPosition();
        }
    }
}