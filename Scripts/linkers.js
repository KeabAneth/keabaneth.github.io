document.getElementById("linkersCont").addEventListener("click", e => {
    if (e.target.id === "backendLink") {
        window.location.href = "/backend";
    } else if (e.target.id === "frontendLink") {
        window.location.href = "/frontend";
    } else {
        window.location.href = "/"
    }
})

const projDescs = document.querySelectorAll(".projDesc");
const projects = document.querySelectorAll(".projects img");

for (const proj of projects) {
    proj.addEventListener("mouseenter", e => {
        proj.nextElementSibling.style.display = "block";
    })
    proj.addEventListener("mouseleave", e => {
        proj.nextElementSibling.style.display = "none";
    })
}