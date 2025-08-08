const settingBtn = document.getElementById("settings")
const settingsOverlay = document.getElementById("settingsOverlay")

settingBtn.addEventListener("click", e => {
    settingsOverlay.style.display = "block";
})

settingsOverlay.addEventListener("click", e => {
    if(e.target.id == "settingsOverlay") {
        settingsOverlay.style.display = "none";
    }
})