namespace FirstFudge {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);
    let node: ƒ.Node = new ƒ.Node("Test");
    let viewport: ƒ.Viewport = new ƒ.Viewport();
    
    function init(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        node.addComponent(new ƒ.ComponentTransform());

        let mesh: ƒ.Mesh = new ƒ.MeshCube("Quad");
        node.addComponent(new ƒ.ComponentMesh(mesh));

        let material: ƒ.Material = new ƒ.Material("Testmaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));

        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        node.addComponent(cmpMaterial);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);

        viewport.initialize("Viewport", node, cmpCamera, canvas);
        viewport.draw();

        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    }
    
    function update(_event: Event): void {
        let rotSpeed: number = 90;
        let timeSinceLastFrameInSeconds: number = ƒ.Loop.timeFrameReal / 1000;
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateY(rotSpeed * timeSinceLastFrameInSeconds);
        viewport.draw();
    }
}
//Alt+Shift+F = auto-format
/*
Koordinatensystem = Rechtshändig
x = links (-) - rechts (+)
y = unten (-) - oben (+)
z = vorne (-) - honten (+)
*/