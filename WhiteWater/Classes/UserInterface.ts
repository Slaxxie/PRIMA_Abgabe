namespace WhiteWater {
    import ƒ = FudgeCore;


    export class UserInterface extends ƒ.Node {
        constructor(_x: number, _y: number, _path: string) {
            super("interfacePanel");

            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            this.mtxLocal.translateZ(1);
            let panelMesh: ƒ.Mesh = new ƒ.MeshSprite("interfacePanel_Mesh");
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(panelMesh);
            this.addComponent(cmpMesh);
            let uiTex: ƒ.TextureImage = new ƒ.TextureImage(_path);



            let materialLeft: ƒ.Material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), uiTex));
            this.addComponent(new ƒ.ComponentMaterial(materialLeft));


            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(6.5);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(21);

        }

    }
}