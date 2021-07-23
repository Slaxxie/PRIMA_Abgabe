namespace WhiteWater {
    import ƒ = FudgeCore;

    export class Deflector extends ƒ.Node {
        constructor() {
            super("Shield");
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(0);
            this.mtxLocal.translateY(0.5);
            this.mtxLocal.translateZ(0.1);
            let shieldMesh: ƒ.Mesh = new ƒ.MeshSprite("Shield_Mesh");
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(shieldMesh);
            this.addComponent(cmpMesh);
            
            
            let material: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), deflectorTex));
            this.addComponent(new ƒ.ComponentMaterial(material));

            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(2);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(1);
        }
        
    }
}