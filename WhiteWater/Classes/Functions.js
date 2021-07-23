"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    function randomIntInGamespace() {
        return Math.round((Math.random() * (WhiteWater.rightBorder * 2)) - WhiteWater.rightBorder);
    }
    WhiteWater.randomIntInGamespace = randomIntInGamespace;
    function spawnAmount() {
        return Math.round(((Math.random() * Math.ceil(WhiteWater.level / 5) - 1) + 1));
    }
    WhiteWater.spawnAmount = spawnAmount;
    function levelUp() {
        if (WhiteWater.levelProgress >= (WhiteWater.levelProgressBase + (WhiteWater.level * WhiteWater.levelProgressModifier))) {
            WhiteWater.levelProgress = WhiteWater.levelProgress - (WhiteWater.levelProgressBase + (WhiteWater.level * WhiteWater.levelProgressModifier));
            WhiteWater.level++;
            WhiteWater.velocity = WhiteWater.level + WhiteWater.velocityMod;
            WhiteWater.state = WhiteWater.level % 6;
            console.log(WhiteWater.level);
            WhiteWater.backGroundVelocity = (WhiteWater.level / 5) + WhiteWater.backGroundVelocityMod;
            console.log("Level: " + WhiteWater.level);
            console.log("Velocity: " + WhiteWater.velocity);
            WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.levelUpSound);
            upgrade();
            modifySpawn();
            console.log(WhiteWater.state);
        }
    }
    WhiteWater.levelUp = levelUp;
    function upgrade() {
        switch (WhiteWater.state) {
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
    WhiteWater.upgrade = upgrade;
    function increaseMovementSpeed() {
        WhiteWater.movementSpeed++;
    }
    function heal() {
        WhiteWater.currentLives = WhiteWater.maxLives;
    }
    function increaseLife() {
        WhiteWater.maxLives++;
    }
    function coolDownReduced() {
        WhiteWater.deflectorShieldCooldownMax = WhiteWater.deflectorShieldCooldownMax - 120;
    }
    function getTimeWarp() {
        if (WhiteWater.timeWarpCharges < 3) {
            WhiteWater.timeWarpCharges++;
            timewarpToHTML(WhiteWater.timeWarpCharges);
        }
    }
    function checkCollision() {
        if (WhiteWater.invulnerableActive == false) {
            for (let rock of WhiteWater.rocks.getChildren()) {
                if (rock.checkCollision(WhiteWater.player)) {
                    WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.hitSound);
                    WhiteWater.rocks.removeChild(rock);
                    WhiteWater.currentLives = WhiteWater.currentLives - rock.damageOfContact;
                    currentLivesToHTML(WhiteWater.currentLives);
                    gameOver();
                    console.log("CR:" + WhiteWater.currentLives);
                }
            }
        }
        for (let loot of WhiteWater.lootables.getChildren()) {
            if (loot.checkCollision(WhiteWater.player)) {
                WhiteWater.lootables.removeChild(loot);
                WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.lootingSound);
                WhiteWater.playerPoints = WhiteWater.playerPoints + loot.worthOfLoot;
                pointsToHTML(WhiteWater.playerPoints);
                WhiteWater.levelProgress = WhiteWater.levelProgress + loot.worthOfLoot;
                levelUp();
                maxLivesToHTML(WhiteWater.maxLives);
                currentLivesToHTML(WhiteWater.currentLives);
                levelToHTML(WhiteWater.level);
                console.log("Player Points: " + WhiteWater.playerPoints);
                console.log("Level progress: " + WhiteWater.levelProgress);
            }
        }
    }
    WhiteWater.checkCollision = checkCollision;
    function pointsToHTML(points) {
        let div = document.getElementById("UI-Points");
        div.textContent = String(points);
    }
    function levelToHTML(levels) {
        let div = document.getElementById("UI-Level");
        div.textContent = String(levels);
    }
    function timewarpToHTML(timewarp) {
        let div = document.getElementById("UI-Timewarp");
        div.textContent = "CHARGES: " + String(timewarp);
    }
    WhiteWater.timewarpToHTML = timewarpToHTML;
    function shieldCDToHTML(shieldstatus) {
        let div = document.getElementById("UI-Shield");
        div.textContent = shieldstatus;
    }
    WhiteWater.shieldCDToHTML = shieldCDToHTML;
    function currentLivesToHTML(currentlives) {
        let div = document.getElementById("UI-CurrentLives");
        div.textContent = String(currentlives);
    }
    function maxLivesToHTML(maxlives) {
        let div = document.getElementById("UI-MaxLives");
        div.textContent = String(maxlives);
    }
    function gameOver() {
        if (WhiteWater.currentLives <= 0) {
            WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.gameOverSound);
            WhiteWater.sfxPlayer.soundTrack(false);
            ƒ.Loop.stop();
            gameOverMenu();
        }
    }
    WhiteWater.gameOver = gameOver;
    function mainMenu() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.MAINMENU;
        WhiteWater.sfxPlayer.menuSound(true);
        console.log(WhiteWater.gamestate);
        ƒ.Loop.stop();
        document.getElementById("mainMenu").style.display = "inline";
    }
    WhiteWater.mainMenu = mainMenu;
    function pauseGame() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.PAUSE;
        WhiteWater.sfxPlayer.cmpAudioSoundtrack.volume = 0.05;
        console.log(WhiteWater.gamestate);
        ƒ.Loop.stop();
        document.getElementById("pauseMenu").style.display = "inline";
    }
    WhiteWater.pauseGame = pauseGame;
    function optionMenu() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.OPTIONS;
        console.log(WhiteWater.gamestate);
        document.getElementById("MasterVolumeMainMenu").value = WhiteWater.masterVolume.toString();
        document.getElementById("optionMenu").style.display = "inline";
    }
    WhiteWater.optionMenu = optionMenu;
    function optionMenuInGame() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.OPTIONS;
        console.log(WhiteWater.gamestate);
        document.getElementById("MasterVolume").value = WhiteWater.masterVolume.toString();
        document.getElementById("optionMenuInGame").style.display = "inline";
    }
    WhiteWater.optionMenuInGame = optionMenuInGame;
    function resumeGame() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.PLAYING;
        WhiteWater.sfxPlayer.cmpAudioSoundtrack.volume = 0.3;
        WhiteWater.sfxPlayer.soundTrack(true);
        console.log(WhiteWater.gamestate);
        ƒ.Loop.continue();
    }
    WhiteWater.resumeGame = resumeGame;
    function highScore() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.HIGHSCORE;
        document.getElementById("highscoreMenu").style.display = "inline";
        console.log(WhiteWater.gamestate);
        topTen();
        console.log(WhiteWater.highScoreArray);
        let highScoreTable = document.getElementById("highscoreTable");
        highScoreTable.innerHTML = "";
        let tableHeader = document.createElement("tr");
        let tablePlace = document.createElement("th");
        tablePlace.textContent = "Place";
        tableHeader.appendChild(tablePlace);
        let tableName = document.createElement("th");
        tableName.textContent = "Name";
        tableHeader.appendChild(tableName);
        let tableScore = document.createElement("th");
        tableScore.textContent = "Score";
        tableHeader.appendChild(tableScore);
        highScoreTable.appendChild(tableHeader);
        for (let i = 0; i < WhiteWater.highScoreArray.length; i++) {
            let tr = document.createElement("tr");
            let currentPlace = document.createElement("td");
            currentPlace.textContent = String(i + 1);
            tr.appendChild(currentPlace);
            let currentName = document.createElement("td");
            currentName.textContent = WhiteWater.highScoreArray[i].name;
            tr.appendChild(currentName);
            let currentScore = document.createElement("td");
            currentScore.textContent = String(WhiteWater.highScoreArray[i].points);
            tr.appendChild(currentScore);
            highScoreTable.appendChild(tr);
        }
        console.log(highScoreTable);
    }
    WhiteWater.highScore = highScore;
    function gameOverMenu() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.GAMEOVER;
        console.log(WhiteWater.gamestate);
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
    WhiteWater.gameOverMenu = gameOverMenu;
    function evalInput(_event) {
        if (_event.key != "Enter") {
            return;
        }
        let nameInputField = document.getElementById("gameOverInput");
        let input = nameInputField.value;
        if (input === "" || input === null) {
            input = "Anonymous";
        }
        let i = 0;
        while (true) {
            let score = localStorage.getItem(i.toString());
            if (!score) {
                // tslint:disable-next-line: quotemark
                localStorage.setItem(i.toString(), '{"name": "' + input + '","points": ' + WhiteWater.playerPoints + '}');
                break;
            }
            i++;
        }
        location.reload();
    }
    function topTen() {
        let i = 0;
        while (true) {
            let score = localStorage.getItem(i.toString());
            if (score) {
                let scoreObj = JSON.parse(score);
                WhiteWater.highScoreArray.push(scoreObj);
            }
            else {
                break;
            }
            i++;
        }
        // tslint:disable-next-line: no-any
        function compare(a, b) {
            // tslint:disable-next-line: typedef
            const hScoreA = a.points;
            // tslint:disable-next-line: typedef
            const hScoreB = b.points;
            let comparison = 0;
            if (hScoreA > hScoreB) {
                comparison = -1;
            }
            else if (hScoreA < hScoreB) {
                comparison = 1;
            }
            return comparison;
        }
        WhiteWater.highScoreArray = WhiteWater.highScoreArray.sort(compare);
        WhiteWater.highScoreArray = WhiteWater.highScoreArray.slice(0, 10);
        //console.log(highScoreArray);
        //forschleife zum auslesen
        /* console.log(highScoreArray); */
        //
    }
    function modifySpawn() {
        switch (WhiteWater.level) {
            case 1: {
                WhiteWater.spawnCounterMax = 55;
                break;
            }
            case 5: {
                WhiteWater.spawnCounterMax = 50;
                break;
            }
            case 10: {
                WhiteWater.spawnCounterMax = 40;
                break;
            }
            case 15: {
                WhiteWater.spawnCounterMax = 30;
                break;
            }
            case 20: {
                WhiteWater.spawnCounterMax = 18;
                break;
            }
            case 25: {
                WhiteWater.spawnCounterMax = 11;
                break;
            }
            case 30: {
                WhiteWater.spawnCounterMax = 7;
                break;
            }
            default: {
                break;
            }
        }
    }
    WhiteWater.modifySpawn = modifySpawn;
    function changeMasterVolume(_event) {
        let slider = _event.target;
        WhiteWater.masterVolume = parseInt(slider.value) / 100;
        ƒ.AudioManager.default.volume = WhiteWater.masterVolume;
        ƒ.AudioManager.default.gain.gain.value = WhiteWater.masterVolume;
    }
    WhiteWater.changeMasterVolume = changeMasterVolume;
    async function loadGameValues() {
        WhiteWater.gameValueObject = await (await fetch("GameOptions.json")).json();
        WhiteWater.gameValueObject = WhiteWater.gameValueObject.gameValueObject;
        console.log(WhiteWater.gameValueObject);
        WhiteWater.deflectorShieldCooldownMax = WhiteWater.gameValueObject.deflectorShieldCooldownMax;
        WhiteWater.invulnerableEnd = WhiteWater.gameValueObject.invulnerableEnd;
        WhiteWater.timeWarpEnd = WhiteWater.gameValueObject.timeWarpEnd;
        WhiteWater.movementSpeed = WhiteWater.gameValueObject.movementSpeed;
        WhiteWater.bigLootPropability = WhiteWater.gameValueObject.bigLootPropability;
        WhiteWater.reward = WhiteWater.gameValueObject.reward;
        WhiteWater.rewardFactor = WhiteWater.gameValueObject.rewardFactor;
        WhiteWater.maxLives = WhiteWater.gameValueObject.maxLives;
        WhiteWater.levelProgressBase = WhiteWater.gameValueObject.levelProgressBase;
        WhiteWater.levelProgressModifier = WhiteWater.gameValueObject.levelProgressModifier;
        WhiteWater.asteroidDamage = WhiteWater.gameValueObject.asteroidDamage;
    }
    WhiteWater.loadGameValues = loadGameValues;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=Functions.js.map