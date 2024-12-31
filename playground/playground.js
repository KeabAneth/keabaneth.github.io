const renderBtn = document.getElementById("render");
const iframeEl = document.getElementById("rendered");
const toBeRendered = document.getElementById("toBeRendered");

const renderedIframe = iframeEl.srcdoc


renderBtn.addEventListener("click", () => {
    document.querySelector("iframe").srcdoc = document.querySelector("#toBeRendered").value
})