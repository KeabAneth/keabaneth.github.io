const info = document.getElementById("info");
const guess = document.getElementById("guess");
const sub = document.getElementById("btn");
const feedback = document.getElementById("feed");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const shakeElement = document.querySelector(".squ");
const tabs = document.getElementById("tabs");


function format() {
    // const selTabs = document.querySelectorAll(".tabs")
    // selTabs.style.right = scoreEl.getBoundingClientRect().right + "px"

}

format();

document.addEventListener("resize", format);

document.addEventListener("submit", (e) => {
    if(!waiting) {
        return;
    }
    shakeElement.classList.add("animate");
    feedback.textContent = "Generating..."
    document.body.style.backgroundColor = "white";
    setTimeout(function () {
      shakeElement.classList.remove("animate");
      genNumb()
      feedback.textContent = `what is ${currNumb} squared`;
      waiting = false;
      sub.textContent = "Guess"
      document.body.style.backgroundColor = "white";
      strikes = 0;
      feedback.textContent = `What is ${currNumb} squared`
      // strikes = 0;
    //   return;
    }, 1000); 
});
let prog2 = 0;
document.addEventListener("keydown", (e) => {
    if(prog2 == 0 && e.key == "s") {
        prog2++;
    } else if(prog2 == 1 && e.key == "n") {
        prog2++;
    } else if(prog2 == 2 && e.key == "o") {
        prog2++;
    } else if(prog2 == 3 && e.key == "w") {
        prog2++;
        let win2 = window.open()
        win2.document.body.style.margin = "0px";
let url2 = "/snow"
let iframe2 = win2.document.createElement('iframe')
iframe2.style.width = "100%";
iframe2.style.height = "100%";
iframe2.style.border = "none";
iframe2.src = url2
win2.document.body.appendChild(iframe2)
    } else {
        prog2 = 0;
    }
})

let prog = 0;
document.addEventListener("keydown", (e) => {
    if(prog == 0 && e.key == "j") {
        prog++;
    } else if(prog == 1 && e.key == "a") {
        prog++;
    } else if(prog == 2 && e.key == "z") {
        prog++;
    } else if(prog == 3 && e.key == "z") {
        prog++;
        var win = window.open()
        win.document.body.style.margin = "0px";
var url = "/fnaw/"
var iframe = win.document.createElement('iframe')
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = "none";
iframe.src = url
win.document.body.appendChild(iframe)
    } else {
        prog = 0;
    }
})

let strikes = 0;
let waiting = false;
let score = 0;
let best = localStorage.getItem("best") || 0;

bestEl.textContent = best;

let currNumb = Math.round(Math.random() * (30 - 1) + 1)

function genNumb() {
    currNumb = Math.round(Math.random() * (30 - 1) + 1);
    info.textContent = currNumb + "²";
    guess.value = "";
}

function setScores(setter) {
    if(setter === 1) {
        score++;
        if(score >= best) {
            best = score;
            localStorage.setItem("best", score.toString());
            bestEl.textContent = best;
        }
    } else {
        score = 0;
    }
    scoreEl.textContent = score;
}

genNumb();

info.textContent = currNumb.toString()

document.addEventListener("submit", (e)=> {
    e.preventDefault();
    if(waiting === true) {
        // genNumb()
        // feedback.textContent = `what is ${currNumb} squared`;
        // waiting = false;
        // sub.textContent = "Guess"
        // // strikes = 0;
        // return;
    }
    if(!shakeElement.classList.contains("animate")){
    feedback.textContent = 2 - strikes + " guesses left";
}
    if(currNumb * currNumb == guess.value){
        genNumb();
        setScores(1);
        strikes = 0;
        document.body.style.backgroundColor = "white";
        feedback.textContent = `what is ${currNumb} squared`;
        return;
    } else {
        if(strikes < 2) {
            strikes++;
            if(strikes == 1) {
                document.body.style.backgroundColor = "yellow";
            } else if(strikes == 2) {
                document.body.style.backgroundColor = "red";
            }
            // strikes++;
        } else {
            setScores(-1);
            feedback.textContent = "The answer was " + currNumb*currNumb + " press enter to continue";
            document.body.style.backgroundColor = "white";
            strikes = 0;
            sub.textContent = "Continue"
            waiting = true
        }
    }

})