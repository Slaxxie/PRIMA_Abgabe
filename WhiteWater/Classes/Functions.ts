namespace WhiteWater {
    import ƒ = FudgeCore;

    export function randomIntInGamespace(): number {
        return Math.round((Math.random() * (rightBorder * 2)) - rightBorder);
    }

    export function spawnAmount(): number {
        return Math.round(((Math.random() * Math.ceil(level / 5) - 1) + 1));
    }

    export function levelUp(): void {
        if (levelProgress >= (levelProgressBase + (level * levelProgressModifier))) {
            levelProgress = levelProgress - (levelProgressBase + (level * levelProgressModifier));
            level++;
            velocity = level + velocityMod;
            state = level % 6;
            console.log(level);
            backGroundVelocity = (level / 5) + backGroundVelocityMod;
            console.log("Level: " + level);
            console.log("Velocity: " + velocity);
            sfxPlayer.playSFX(SFXs.levelUpSound);
            upgrade();
            modifySpawn();
            console.log(state);
        }
    }

    export function upgrade(): void {

        switch (state) {
            case 1: {
                heal();
                break;
            }
            case 2: {
                increaseMovementSpeed();
                break;
            }
            case 3: {
                coolDownReduced();
                break;
            }
            case 4: {
                heal();
                break;
            }
            case 5: {
                increaseLife();
                break;
            }
            case 0: {
                getTimeWarp();
                break;
            }
            default: {
                break;
            }
        }
    }

    function increaseMovementSpeed(): void {
        movementSpeed++;
    }
    function heal(): void {
        currentLives = maxLives;
    }
    function increaseLife(): void {
        maxLives++;
    }
    function coolDownReduced(): void {
        deflectorShieldCooldownMax = deflectorShieldCooldownMax - 120;
    }
    function getTimeWarp(): void {
        if (timeWarpCharges < 3) {
            timeWarpCharges++;
            timewarpToHTML(timeWarpCharges);
        }
    }
    export function checkCollision(): void {
        if (invulnerableActive == false) {
            for (let rock of rocks.getChildren() as Rock[]) {
                if (rock.checkCollision(player)) {
                    sfxPlayer.playSFX(SFXs.hitSound);
                    rocks.removeChild(rock);
                    currentLives = currentLives - rock.damageOfContact;
                    currentLivesToHTML(currentLives);
                    gameOver();
                    console.log("CR:" + currentLives);
                }
            }
        }
        for (let loot of lootables.getChildren() as Loot[]) {
            if (loot.checkCollision(player)) {
                lootables.removeChild(loot);
                sfxPlayer.playSFX(SFXs.lootingSound);
                playerPoints = playerPoints + loot.worthOfLoot;
                pointsToHTML(playerPoints);
                levelProgress = levelProgress + loot.worthOfLoot;
                levelUp();
                maxLivesToHTML(maxLives);
                currentLivesToHTML(currentLives);
                levelToHTML(level);
                console.log("Player Points: " + playerPoints);
                console.log("Level progress: " + levelProgress);
            }
        }
    }
    function pointsToHTML(points: number): void {
        let div: HTMLElement = document.getElementById("UI-Points");
        div.textContent = String(points);
    }
    function levelToHTML(levels: number): void {
        let div: HTMLElement = document.getElementById("UI-Level");
        div.textContent = String(levels);
    }
    export function timewarpToHTML(timewarp: number): void {
        let div: HTMLElement = document.getElementById("UI-Timewarp");
        div.textContent = "CHARGES: " + String(timewarp);
    }
    export function shieldCDToHTML(shieldstatus: string): void {
        let div: HTMLElement = document.getElementById("UI-Shield");
        div.textContent = shieldstatus;
    }
    function currentLivesToHTML(currentlives: number): void {
        let div: HTMLElement = document.getElementById("UI-CurrentLives");
        div.textContent = String(currentlives);
    }
    function maxLivesToHTML(maxlives: number): void {
        let div: HTMLElement = document.getElementById("UI-MaxLives");
        div.textContent = String(maxlives);
    }

    export function gameOver(): void {
        if (currentLives <= 0) {
            sfxPlayer.playSFX(SFXs.gameOverSound);
            sfxPlayer.soundTrack(false);
            ƒ.Loop.stop();
            gameOverMenu();
        }
    }

    export function mainMenu(): void {
        gamestate = GAMESTATE.MAINMENU;
        sfxPlayer.menuSound(true);
        console.log(gamestate);
        ƒ.Loop.stop();
        document.getElementById("mainMenu").style.display = "inline";

    }

    export function pauseGame(): void {
        gamestate = GAMESTATE.PAUSE;
        sfxPlayer.cmpAudioSoundtrack.volume = 0.05;
        console.log(gamestate);
        ƒ.Loop.stop();
        document.getElementById("pauseMenu").style.display = "inline";

    }

    export function optionMenu(): void {
        gamestate = GAMESTATE.OPTIONS;
        console.log(gamestate);
        document.getElementById("optionMenu").style.display = "inline";
    }

    export function optionMenuInGame(): void {
        gamestate = GAMESTATE.OPTIONS;
        console.log(gamestate);
        document.getElementById("optionMenuInGame").style.display = "inline";
    }

    export function resumeGame(): void {
        gamestate = GAMESTATE.PLAYING;
        sfxPlayer.cmpAudioSoundtrack.volume = 0.3;
        sfxPlayer.soundTrack(true);
        console.log(gamestate);
        ƒ.Loop.continue();
    }


    export function highScore(): void {
        gamestate = GAMESTATE.HIGHSCORE;
        document.getElementById("highscoreMenu").style.display = "inline";
        console.log(gamestate);
        topTen();
        console.log(highScoreArray);
        let highScoreTable: HTMLElement = document.getElementById("highscoreTable");
        highScoreTable.innerHTML = "";
        let tableHeader: HTMLElement = document.createElement("tr");
        let tablePlace: HTMLElement = document.createElement("th");
        tablePlace.textContent = "Place";
        tableHeader.appendChild(tablePlace);
        let tableName: HTMLElement = document.createElement("th");
        tableName.textContent = "Name";
        tableHeader.appendChild(tableName);
        let tableScore: HTMLElement = document.createElement("th");
        tableScore.textContent = "Score";
        tableHeader.appendChild(tableScore);
        highScoreTable.appendChild(tableHeader);
        for (let i: number = 0; i < highScoreArray.length; i++) {
            let tr: HTMLElement = document.createElement("tr");
            let currentPlace: HTMLElement = document.createElement("td");
            currentPlace.textContent = String(i + 1);
            tr.appendChild(currentPlace);
            let currentName: HTMLElement = document.createElement("td");
            currentName.textContent = highScoreArray[i].name;
            tr.appendChild(currentName);
            let currentScore: HTMLElement = document.createElement("td");
            currentScore.textContent = String(highScoreArray[i].points);
            tr.appendChild(currentScore);
            highScoreTable.appendChild(tr);
        }
        console.log(highScoreTable);
    }


    export function gameOverMenu(): void {
        gamestate = GAMESTATE.GAMEOVER;
        console.log(gamestate);
        // let name: string = prompt("INSERT NAME", "Player");
        document.getElementById("gameOverMenu").style.display = "inline";
        document.getElementById("gameOverInput").onkeydown = evalInput;

        

        // tslint:disable-next-line: no-any
        /* const regex: any = /^[a-zA-Z0-9]*$/;
        const isExisting: boolean = regex.test(name);
        console.log(name.length);
        if (!isExisting || name.length <= 3 || name.length >= 10) {
            gameOverMenu();
            return;
        }
        console.log(isExisting);
        if (name == null) {
            name = "Player";
        } */
        
        //location.reload();
    }
    function evalInput(_event: KeyboardEvent): void {
        if (_event.key != "Enter") {
            return;
        }
        let nameInputField: HTMLInputElement = document.getElementById("gameOverInput") as HTMLInputElement;
        let input: string = nameInputField.value;
        if (input === "" || input === null) {
            input = "Anonymous";
        }
        let i: number = 0;
        while (true) {
            let score: string = localStorage.getItem(i.toString());
            if (!score) {
                // tslint:disable-next-line: quotemark
                localStorage.setItem(i.toString(), '{"name": "' + input + '","points": ' + playerPoints + '}');
                break;
            }
            i++;
        } 
        location.reload();
    }

    function topTen(): void {
        let i: number = 0;


        while (true) {
            let score: string = localStorage.getItem(i.toString());
            if (score) {
                let scoreObj: { name: string, points: number } = JSON.parse(score);
                highScoreArray.push(scoreObj);
            } else {
                break;
            }
            i++;
        }

        // tslint:disable-next-line: no-any
        function compare(a: any, b: any): number {
            // tslint:disable-next-line: typedef
            const hScoreA = a.points;
            // tslint:disable-next-line: typedef
            const hScoreB = b.points;

            let comparison: number = 0;
            if (hScoreA > hScoreB) {
                comparison = -1;
            } else if (hScoreA < hScoreB) {
                comparison = 1;
            }
            return comparison;
        }
        highScoreArray = highScoreArray.sort(compare);
        highScoreArray = highScoreArray.slice(0, 10);
        //console.log(highScoreArray);
        //forschleife zum auslesen


        /* console.log(highScoreArray); */
        //
    }

    export function modifySpawn(): void {
        switch (level) {
            case 1: {
                spawnCounterMax = 55;
                break;
            }
            case 5: {
                spawnCounterMax = 50;
                break;
            }
            case 10: {
                spawnCounterMax = 40;
                break;
            }
            case 15: {
                spawnCounterMax = 30;
                break;
            }
            case 20: {
                spawnCounterMax = 18;
                break;
            }
            case 25: {
                spawnCounterMax = 11;
                break;
            }
            case 30: {
                spawnCounterMax = 7;
                break;
            }
            default: {
                break;
            }
        }
    }
    export function changeMasterVolume(_event: Event): void {
        let slider: HTMLInputElement = <HTMLInputElement>_event.target;
        masterVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = masterVolume;
        ƒ.AudioManager.default.gain.gain.value = masterVolume;
    }

    export async function loadGameValues(): Promise<void> {
        gameValueObject = await (await fetch("GameOptions.json")).json();
        gameValueObject = gameValueObject.gameValueObject;
        console.log(gameValueObject);
        deflectorShieldCooldownMax = gameValueObject.deflectorShieldCooldownMax;
        invulnerableEnd = gameValueObject.invulnerableEnd;
        timeWarpEnd = gameValueObject.timeWarpEnd;
        movementSpeed = gameValueObject.movementSpeed;
        bigLootPropability = gameValueObject.bigLootPropability;
        reward = gameValueObject.reward;
        rewardFactor = gameValueObject.rewardFactor;
        maxLives = gameValueObject.maxLives;
        levelProgressBase = gameValueObject.levelProgressBase;
        levelProgressModifier = gameValueObject.levelProgressModifier;
        asteroidDamage = gameValueObject.asteroidDamage;
    }
}