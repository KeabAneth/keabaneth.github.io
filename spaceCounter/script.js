let spaceAlreadyPressed = false;

localStorage.getItem("spacedCount") ? spacedCount = localStorage.getItem("spacedCount") : spacedCount = 0;
const counter = document.getElementById("counter");

document.addEventListener("keydown", e => {
    if(e.key == " ") {
        if (!spaceAlreadyPressed) {
        spacedCount +=1;
        counter.textContent = spacedCount
        spaceAlreadyPressed = true;
        } 
        
    }
})

document.addEventListener("keyup", e=> {
    if(e.key == " ") {
        spaceAlreadyPressed = false;
    }
})