const title = document.getElementById("title");
const boards = document.getElementById("boards");
const instruct = document.getElementById("instruct");
const main = document.getElementById("main");

let selectedGamemode = "VS BOT";
let p2Board = main.cloneNode(true);
let p1Choice = "";
p2Board.querySelector("#select").id = "button2";
p2Board.id = "main2";

checkTitle();
window.addEventListener("resize", () => {
    checkTitle(); 
    formatStartBg();
    });

let mainInfo = main.getBoundingClientRect();

function formatStartBg() {
    mainInfo = boards.getBoundingClientRect();
    if (main) {
        // if (!p2Board) {
        startGameOverlay.style.width = mainInfo.width + "px";
        startGameOverlay.style.height = mainInfo.height + "px";
        startGameOverlay.style.left = mainInfo.left + "px";
        startGameOverlay.style.top = mainInfo.top + "px";
    // } else {
        console.log("p2")
        // let main2Info = p2Board.getBoundingClientRect();
        // startGameOverlay.style.width = mainInfo.width + main2Info.width + "px";
        // startGameOverlay.style.height = mainInfo.height + main2Info.height + "px";
    // }
    }
}

function checkTitle() {
    if (visualViewport.width < 633) {
        title.textContent = "Play RPS!"
    } else {
        title.textContent = "Play Rock Paper Scissors!"
    }

}
//end format
const gamemode = document.getElementById("gamemode")

gamemode.addEventListener("click", e => {
    changeSelected(e.target, e.currentTarget);
    formatStartBg();
});

boards.addEventListener("click", (e) => {
    if(e.target.id = "select" && p1Choice) {
        botChoose();
    }
})

boards.addEventListener("click", (e) => {
    let ret = false;
    if(e.target.id == "select") {
        return;
    }
    if(e.target == boards) {
        ret = true;
        // return;
    } else {
        for(const element of boards.children) {
            if (e.target == element) {
                ret = true;
                return;
            } else {
                if(!ret) {
                    for(const el of element.children) { 
                        if(e.target == el) {
                            ret = true;
                            return;
                        }
                        for(const ep of el.children) {
                        ep.classList.remove("selected");
                        }
                }
            }
            }

}}
if(!ret || e.target.id != "board" || e.target.id != "main") {
e.target.classList.add("selected");
p1Choice = e.target.alt;
instruct.textContent = p1Choice;
}
});

function gamemodeAnim(target) {
    

}

function changeSelected(target, container) {
    const cont = container.children;
    if (target !== container && target.textContent !== selectedGamemode) {
    for (const parts of cont) {
        if (parts.classList.contains("selected")) {
            parts.classList.remove("selected");
        }
    }
    target.classList.add("selected");

    if (container.id === "gamemode") {
        gamemodeAnim(target);
        selectedGamemode = target.textContent;
        changeGamemode(selectedGamemode)
    }
}
}
function changeGamemode(gm) {
    if (gm === "VS BOT") {
        console.log("vsbot");
        if (document.getElementById("main2")) {
            p2Board.remove();
        }
    } else {
        boards.append(p2Board);
    }
}

function startGame() {
    startGameOverlay.style.display = "none";
    gamemode.style.display = "none";
    if (selectedGamemode === "VS BOT") {
        instruct.textContent = "Choose either rock paper or scissors.";
    }
}

function botChoose() {
    const randNum = Math.random();
    let botChose
    if (randNum > 0.33 && randNum < 0.66) {
        botChose = "rock";
        // instruct.textContent = "bot chose rock, you " + result;
    } else if (randNum > 0.66) {
        // instruct.textContent = "bot chose paper you " + result;
        botChose = "paper";
    } else if (randNum < 0.33) {
        // instruct.textContent = "bot chose scissors you " + result;
        botChose = "scissors";
    }
    let win;
    if(botChose === p1Choice) {
        instruct.textContent = `The bot chose ${botChose}, it's a tie!`;
        return;
    } else if(botChose == "paper") {
        if(p1Choice == "rock") {
            win = false;
        } else if(p1Choice == "scissors") {
            win = true;
        }
    } else if(botChose == "rock") {
        if(p1Choice == "paper") {
            win = true;
        } else if(p1Choice == "scissors") {
            win = false;
        }

    } else if(botChose == "scissors") {
        if(p1Choice == "rock") {
            win = true;
        } else if(p1Choice == "paper") {
            win = false;
        }
    }
    if(win) {
        instruct.textContent = `The bot chose ${botChose} you won :D `;
    } else {
        instruct.textContent = `The bot chose ${botChose} you lost. :( `;
    }
}

const startGameOverlay = document.createElement("div");
startGameOverlay.classList.add("startBg");
startGameOverlay.style.width = mainInfo.width + "px";
startGameOverlay.style.height = mainInfo.height + "px";
startGameOverlay.style.left = mainInfo.left + "px";
startGameOverlay.style.top = mainInfo.top + "px";
const startBtn = document.createElement("button");

startBtn.textContent = "Start";
startBtn.classList.add("startBtn")

startGameOverlay.append(startBtn)
startBtn.addEventListener("click", startGame);


document.body.append(startGameOverlay);