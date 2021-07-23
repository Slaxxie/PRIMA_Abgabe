namespace WhiteWater {
    import ƒ = FudgeCore;

    export let gameNode: ƒ.Node = new ƒ.Node("Game");
    export let viewportNode: ƒ.Node = new ƒ.Node("Viewport");
    export let viewport: ƒ.Viewport = new ƒ.Viewport();

    export let moveDirection: boolean = true;
    export let collisionRight: boolean = false;
    export let collisionLeft: boolean = false;

    export let deflectorShieldAvailable: boolean = true;
    export let deflectorShieldCooldown: number;
    export let deflectorShieldCooldownMax: number; //900
    export let invulnerableActive: boolean = false;
    export let invulnerable: number;
    export let invulnerableEnd: number; //180

    export let timeWarpCharges: number = 0;
    export let timeWarpActive: boolean = false;
    export let timeWarp: number;
    export let timeWarpEnd: number; //300

    export let level: number = 1;

    export let rocks: ƒ.Node = new ƒ.Node("Rocks");
    export let lootables: ƒ.Node = new ƒ.Node("Lootables");
    export let backGroundNode: ƒ.Node = new ƒ.Node("Background");
    export let player: Player;
    export let deflectorNode: ƒ.Node = new ƒ.Node("Deflector");
    export let uiNode: ƒ.Node = new ƒ.Node("UI");

    export let movementSpeed: number; //8
    export let leftBorder: number = -7;
    export let rightBorder: number = 7;
    export let velocityMod: number = 4;
    export let velocity: number = level + velocityMod;
    export let spawnCounter: number = 0;
    export let spawnCounterMax: number;
    export let spawnCounterTimewarp: number = 120;
    export let spawnCounterTrue: number;
    export let lootCounter: number = 0;
    export let rocksPos: number;
    export let bigLootPropability: number; //0.15
    export let playerPoints: number = 0;
    export let levelProgress: number = 0;
    export let asteroidDamage: number;
    export let bigRockDamage: number = 2;
    export let mediumRockDamage: number = 1;
    export let reward: number; //100
    export let rewardFactor: number; //3
    export let currentLives: number;
    export let maxLives: number; //3
    export let state: number;
    export let gamestate: GAMESTATE;
    export let gamestateTemp: GAMESTATE;
    // tslint:disable-next-line: no-any
    export let highscoreObject: any;
    // tslint:disable-next-line: no-any
    export let gameValueObject: any;
    export let levelProgressBase: number; //200
    export let levelProgressModifier: number; //100
    export let backGroundVelocityMod: number = 2;
    export let backGroundVelocity: number = (level / 5) + backGroundVelocityMod;
    export let backGroundStateTemp: number;
    export let sfxPlayer: SFX = new SFX();
    export let highScoreArray: { name: string, points: number }[] = [];
    
    /* let backGroundNode: ƒ.Node = new Background(backX, backY, backZ); */

}