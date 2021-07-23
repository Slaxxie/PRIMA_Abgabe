namespace WhiteWater {
    import ƒ = FudgeCore;
    export class Rock extends QuadNode {
        private static count: number = 0;
        public damageOfContact: number;

        constructor(_pos: ƒ.Vector2) {
           /*  export let texture: ƒ.TextureImage = new ƒ.TextureImage("invader2.png");
            export let texture2: ƒ.TextureImage = new ƒ.TextureImage("invader2.png");
            export let texture3: ƒ.TextureImage = new ƒ.TextureImage("invader2.png"); */
            if (Math.random() * (level / 2) <= 3) {
                let scale: ƒ.Vector2 = new ƒ.Vector2(1, 1);
                super("Rock" + (++Rock.count), _pos, scale);
                
                let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), asteroid1));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.damageOfContact = asteroidDamage;
            } else if (Math.random() * (level / 2) <= 8) {
                let scale: ƒ.Vector2 = new ƒ.Vector2(2, 2);
                super("Rock" + (++Rock.count), _pos, scale);
                let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), asteroid2));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.damageOfContact = asteroidDamage + mediumRockDamage;
            } else {
                let scale: ƒ.Vector2 = new ƒ.Vector2(3, 3);
                super("Rock" + (++Rock.count), _pos, scale);
                let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), asteroid3));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.damageOfContact = asteroidDamage + bigRockDamage;
            }

        }
        public move(_movement: number): void {
            let timeSinceLastFrame: number = ƒ.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateY(timeSinceLastFrame * _movement);
            this.setRectPosition();
        }
    }
}