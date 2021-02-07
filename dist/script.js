"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confetti_js_1 = require("confetti-js/");
const utils_1 = require("@mkbabb/animation/src/utils");
const confettiSettings = { target: "confetti" };
const confetti = new confetti_js_1.ConfettiGenerator(confettiSettings);
function radians(x) {
    return (Math.PI * x) / 180;
}
console.log("hi");
class Carousel {
    constructor(settings) {
        var _a, _b, _c, _d, _e, _f;
        this.target = document.querySelector(settings.target);
        this.focusedCell = (_a = document.querySelector(settings.focusedCell)) !== null && _a !== void 0 ? _a : this.target.children[0];
        const tmp = (cell, i, angle) => {
            return cell;
        };
        this.onfocus = (_b = settings.onfocus) !== null && _b !== void 0 ? _b : tmp;
        this.onunfocus = (_c = settings.onunfocus) !== null && _c !== void 0 ? _c : tmp;
        this.xTilt = (_d = settings.xTilt) !== null && _d !== void 0 ? _d : 10;
        this.axis = (_e = settings.axis) !== null && _e !== void 0 ? _e : "Y";
        this.index = 0;
        this.margin = (_f = settings.margin) !== null && _f !== void 0 ? _f : 10;
    }
    getCellAxis() {
        const offset = utils_1.getOffset(this.focusedCell);
        if (this.axis == "X") {
            return offset.width;
        }
        else {
            return offset.height;
        }
    }
    getAlpha() {
        const cellCount = this.target.children.length;
        return (2 * Math.PI) / cellCount;
    }
    getRadius() {
        const cellAxis = this.getCellAxis();
        const cellCount = this.target.children.length;
        return Math.floor((cellAxis / 2) * (1 / Math.tan(Math.PI / cellCount)));
    }
    rollCarousel() {
        const cellCount = this.target.children.length;
        const radius = this.getRadius();
        const alpha = this.getAlpha();
        const tiltYOffset = radius * Math.sin(radians(this.xTilt));
        Object.assign(this.target.style, {
            transform: `translateY(-${tiltYOffset}px) rotateX(-${this.xTilt}deg)`
        });
        Array.from(this.target.children).forEach((child, i) => {
            const childAngle = alpha * (i - this.index);
            const style = {
                transform: `rotate${this.axis}(${childAngle}rad) translateZ(${radius}px)`
            };
            Object.assign(child.style, style);
            if (i === this.index % cellCount) {
                this.onunfocus(this.focusedCell, i, childAngle);
                this.focusedCell = child;
                this.onfocus(this.focusedCell, i, childAngle);
            }
        });
        this.index += 1;
    }
    transposeCarousel() {
        this.rollCarousel();
        const radius = this.getRadius();
        this.target.style.transform = `translateZ(${-radius}px)`;
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// async function shuffleCells() {
//     for (let i = 0; i < SHUFFLE_COUNT; i++) {
//         transposeCarousel();
//         await sleep(250);
//     }
//     transposeCarousel();
// }
const carousel = new Carousel({ target: "#carousel" });
console.log("hi");
carousel.rollCarousel();
document
    .getElementById("rotate-btn")
    .addEventListener("mousedown", function (event) { });
document
    .getElementById("transpose-btn")
    .addEventListener("mousedown", function (event) {
    // transposeCarousel();
});
// document.getElementById("shuffle-btn").addEventListener("mousedown", function (event) {
//     shuffleCells();
// });
function toggle(el, firstCallback, secondCallback) {
    const toggled = el.getAttribute("toggled") === "true";
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
    const toggled = el.getAttribute("toggled") === "true";
    if (!toggled) {
        firstCallback(el);
        el.setAttribute("toggled", true);
    }
    return;
}
document.getElementById("start-btn").addEventListener("click", function (event) {
    const button = document.getElementById("start-btn");
    // shuffleCells();
    toggleOnce(button, function (el) {
        confetti.render();
        // Object.assign(document.querySelector(".rotate-container").style, {
        //     transform: "translateY(0%)",
        //     opacity: "100%"
        // });
        // Object.assign(document.querySelector("#start-btn").style, {
        //     display: "none"
        // });
        // Object.assign(document.querySelector(".left").style, {
        //     opacity: "100%"
        // });
        // Object.assign(document.querySelector(".right").style, {
        //     opacity: "100%"
        // });
        setTimeout(function () {
            document.querySelector(".side-left .image").classList.add("floating");
            document.querySelector(".side-right .image").classList.add("floating");
        }, 500);
    });
});
document.getElementById("play-btn").addEventListener("click", function (event) {
    const mainVideo = document.getElementById("main-video");
    toggle(mainVideo, function (el) {
        el.play();
        console.log("playing");
    }, function (el) {
        el.pause();
        console.log("pausing");
    });
});
//# sourceMappingURL=script.js.map