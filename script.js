let gameContainer = document.getElementById("gameContainer");
let menu = document.getElementById("game-menu");
let difficultyMenu = document.getElementById("difficulty-level-menu");
let scoreBox = document.getElementById("scoreBox");
let chanceBox = document.getElementById("chanceBox");
let totalChances = document.getElementById("totalChances");
let gameOverScreen = document.getElementById("gameOverScreen");
let gameWinScreen = document.getElementById("gameWinScreen");
let quitScreen = document.getElementById("quitScreen");
let playAgainBtn = document.getElementById("playAgainBtn");
let restartBtn = document.getElementById("restartBtn");
let gameStartBtn = document.getElementById("gameStart");
let difficultyBtn = document.getElementById("defficultyLevel");
let easyBtn = document.getElementById("easy");
let mediumBtn = document.getElementById("medium");
let hardBtn = document.getElementById("hard");
let quitBtn = document.getElementById("quitGame");
let mainMenuBtn = document.getElementById("main-menu");
let mainMenuBtn2 = document.getElementById("main-menu2");

let allBaloonsKey = [];
let setChance = 1;
let setScore = 100;
let speed = 100;
gameStartBtn.onclick = function () {
    menu.style.display = "none";
    difficultyMenu.style.display = "none";
    startGame();
};

difficultyBtn.onclick = function () {
    menu.style.display = "none";
    difficultyMenu.style.display = "flex";
};

easyBtn.onclick = function () {
    menu.style.display = "flex";
    difficultyMenu.style.display = "none";
    setChance = 15;
    setScore = 1500;
    speed = 100;
};

mediumBtn.onclick = function () {
    menu.style.display = "flex";
    difficultyMenu.style.display = "none";
    setChance = 10;
    setScore = 1000;
    speed = 70;
};

hardBtn.onclick = function () {
    menu.style.display = "flex";
    difficultyMenu.style.display = "none";
    setChance = 5;
    setScore = 1000;
    speed = 50;
};

quitBtn.onclick = function () {
    quitScreen.style.display = "flex";
    difficultyMenu.style.display = "none";
    gameWinScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    menu.style.display = "none";
};

mainMenuBtn.onclick = function () {
    gameWinScreen.style.display = "none";
    // gameOverScreen.style.display = "none";
    menu.style.display = "flex";
};

mainMenuBtn2.onclick = function () {
    // gameWinScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    menu.style.display = "flex";
};

quitScreen.onclick = function () {
    quitScreen.style.display = "none";
    menu.style.display = "flex";
}

playAgainBtn.onclick = function () {
    gameOverScreen.style.display = "none";
    startGame();
};

restartBtn.onclick = function () {
    gameWinScreen.style.display = "none";
    startGame();
};
// difficultyMenu.style.display = "none";
// quitScreen.style.display = "none";
// gameWinScreen.style.display = "none";
// gameOverScreen.style.display = "flex";
// menu.style.display = "none";

function startGame() {
    let score = 0;
    let maxScore = setScore;
    scoreBox.innerText = score;
    let chances = setChance;
    totalChances.innerText = chances;
    chanceBox.innerText = chances;
    gameOverScreen.style.display = "none";
    gameWinScreen.style.display = "none";
    quitScreen.style.display = "none";
    let baloonsCreate = setInterval(() => {
        let baloon = document.createElement("img");
        baloon.src = "./assets/images/baloon.png";
        baloon.className = "baloon";
        baloon.style.bottom = "0px";
        baloon.style.left = Math.random() * gameContainer.offsetWidth + 'px';

        baloon.onclick = function () {
            score += 10;
            scoreBox.innerText = score;
            baloon.remove();
        };

        let movingKey = setInterval(() => {
            baloon.style.bottom = parseInt(baloon.style.bottom) + 1 + "px";

            let baloonBottom = baloon.offsetTop + baloon.offsetHeight;

            if (baloonBottom < 0) {
                --chances;
                chanceBox.innerText = chances;
                baloon.remove();
                if (chances == 0) {
                    clearInterval(baloonsCreate);
                    gameOverScreen.style.display = "flex";
                    for (let key of allBaloonsKey) {
                        clearInterval(key);
                    }
                    let baloons = document.querySelectorAll(".baloon");

                    for (let baloon of baloons) {
                        baloon.remove();
                    }
                }
            } else if (score == maxScore) {
                clearInterval(baloonsCreate);
                gameWinScreen.style.display = "flex";
                for (let key of allBaloonsKey) {
                    clearInterval(key);
                }
                let baloons = document.querySelectorAll(".baloon");

                for (let baloon of baloons) {
                    baloon.remove();
                }
            }
        }, Math.random() * speed);

        allBaloonsKey.push(movingKey);

        gameContainer.appendChild(baloon);
    }, 100);
}