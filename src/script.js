import { ConfettiGenerator } from "confetti-js/src/confetti.js";
const confettiSettings = { target: "confetti" };
const confetti = new ConfettiGenerator(confettiSettings);
let cellStyle = window.getComputedStyle(document.getElementById("main-video"));
let cellMargin = 10;
let cellWidth = parseInt(cellStyle.width.replace("px", "")) + cellMargin;
let cellHeight = parseInt(cellStyle.height.replace("px", "")) + cellMargin;
const SHUFFLE_COUNT = 3;
var index = 0;
var axis = "Y";
var cellAxis = cellWidth;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function rollCarousel() {
    let mainVideo = document.getElementById("main-video");
    mainVideo.pause();
    mainVideo.setAttribute("toggled", "false");
    let carousel = document.getElementById("carousel");
    let cellCount = carousel.children.length;
    let alpha = (2 * Math.PI) / cellCount;
    let radius = Math.floor((cellAxis / 2) * (1 / Math.tan(Math.PI / cellCount)));
    let tilt = 10;
    let tiltYOffset = radius * Math.sin((tilt * Math.PI) / 180);
    Object.assign(carousel.style, {
        transform: `translateY(-${tiltYOffset}px) rotateX(-${tilt}deg)`
    });
    carousel.childNodes.forEach((child, index) => {
        let childAngle = alpha * (i - index);
        child.style.transform = `rotate${axis}(${childAngle}rad) translateZ(${radius}px)`;
        if (i === index % cellCount) {
            child.setAttribute("id", "main-video");
            child.style.opacity = `1`;
        }
        else {
            // let opacity = Math.floor(100 / Math.cos(childAngle));
            let opacity = 50;
            child.setAttribute("id", "");
            child.style.opacity = `${opacity}%`;
        }
    });
    index++;
}
function transposeCarousel() {
    let carousel = document.getElementById("carousel");
    let cellCount = carousel.children.length;
    let radius = (cellAxis / 2) * (1 / Math.tan(Math.PI / cellCount));
    if (axis == "X") {
        cellAxis = cellWidth;
        axis = "Y";
    }
    else {
        cellAxis = cellHeight;
        axis = "X";
    }
    radius = (cellAxis / 2) * (1 / Math.tan(Math.PI / cellCount));
    rollCarousel();
    carousel.style.transform = `translateZ(${-radius}px)`;
}
async function shuffleCells() {
    for (let i = 0; i < SHUFFLE_COUNT; i++) {
        transposeCarousel();
        await sleep(250);
    }
    transposeCarousel();
}
document.getElementById("rotate-btn").addEventListener("mousedown", function (event) {
    rollCarousel();
});
document
    .getElementById("transpose-btn")
    .addEventListener("mousedown", function (event) {
    transposeCarousel();
});
document.getElementById("shuffle-btn").addEventListener("mousedown", function (event) {
    shuffleCells();
});
function toggle(el, firstCallback, secondCallback) {
    let toggled = el.getAttribute("toggled") === "true";
    if (!toggled) {
        firstCallback(el);
    }
    else {
        secondCallback(el);
    }
    el.setAttribute("toggled", !toggled);
    return;
}
function toggleOnce(el, firstCallback) {
    let toggled = el.getAttribute("toggled") === "true";
    if (!toggled) {
        firstCallback(el);
        el.setAttribute("toggled", true);
    }
    return;
}
document.getElementById("start-btn").addEventListener("click", function (event) {
    let button = document.getElementById("start-btn");
    shuffleCells();
    toggleOnce(button, function (el) {
        confetti.render();
        Object.assign(document.querySelector(".rotate-container").style, {
            transform: "translateY(0%)",
            opacity: "100%"
        });
        Object.assign(document.querySelector("#start-btn").style, {
            display: "none"
        });
        Object.assign(document.querySelector(".left").style, {
            opacity: "100%"
        });
        Object.assign(document.querySelector(".right").style, {
            opacity: "100%"
        });
        setTimeout(function () {
            document.querySelector(".side-left .image").classList.add("floating");
            document.querySelector(".side-right .image").classList.add("floating");
        }, 500);
    });
});
document.getElementById("play-btn").addEventListener("click", function (event) {
    let mainVideo = document.getElementById("main-video");
    toggle(mainVideo, function (el) {
        el.play();
        console.log("playing");
    }, function (el) {
        el.pause();
        console.log("pausing");
    });
});
