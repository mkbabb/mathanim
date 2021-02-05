import { ConfettiGenerator } from "./confetti.js";

const confettiSettings = { target: "confetti" };
const confetti = new ConfettiGenerator(confettiSettings);

let cellStyle = getComputedStyle(document.getElementById("main-video"));
let CELL_WIDTH = parseInt(cellStyle.width.replace("px", "")) + 100;
let CELL_HEIGHT = parseInt(cellStyle.height.replace("px", "")) + 100;

const SHUFFLE_COUNT = 3;
var index = 0;
var axis = "Y";
var cellAxis = CELL_WIDTH;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function rollCarousel() {
    let mainVideo = document.getElementById("main-video");
    mainVideo.pause();
    mainVideo.setAttribute("toggled", false);

    let carousel = document.getElementById("carousel");
    let cellCount = carousel.children.length;
    let alpha = (2 * Math.PI) / cellCount;
    let radius = ~~((cellAxis / 2) * (1 / Math.tan(Math.PI / cellCount)));

    for (let i = 0; i < carousel.children.length; i++) {
        let alpha_i = alpha * (i - index);
        let child = carousel.children[i];
        child.style.transform = `rotate${axis}(${alpha_i}rad) translateZ(${radius}px)`;
        if (i === index % cellCount) {
            child.setAttribute("id", "main-video");
            child.style.opacity = `1`;
        } else {
            child.setAttribute("id", "");
            child.style.opacity = `${~~(1 / Math.cos(alpha_i))}%`;
        }
    }
    index++;
}

function transposeCarousel() {
    let carousel = document.getElementById("carousel");
    let cellCount = carousel.children.length;
    let radius = (cellAxis / 2) * (1 / Math.tan(Math.PI / cellCount));

    if (axis == "X") {
        cellAxis = CELL_WIDTH;
        axis = "Y";
    } else {
        cellAxis = CELL_HEIGHT;
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
    } else {
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
        document.querySelector(".rotate-container").style.transform =
            "translateY(150%)";
        document.querySelector(".video-controls").style.transform = "translateY(-300%)";

        document.querySelector(".side-left").style.transform = "translateX(0)";
        document.querySelector(".side-right").style.transform = "translateX(0)";

        setTimeout(function () {
            document.querySelector(".side-left .image").classList.add("floating");
            document.querySelector(".side-right .image").classList.add("floating");
        }, 500);
    });
});

document.getElementById("play-btn").addEventListener("click", function (event) {
    let mainVideo = document.getElementById("main-video");
    toggle(
        mainVideo,
        function (el) {
            el.play();
            console.log("playing");
        },
        function (el) {
            el.pause();
            console.log("pausing");
        }
    );
});
