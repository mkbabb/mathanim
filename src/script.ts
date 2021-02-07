import { default as ConfettiGenerator } from "../node_modules/confetti-js/src/confetti.js";

import { Carousel, sleep } from "./carousel.js";

import { smoothAnimate } from "../node_modules/@mkbabb/animation/src/animation.js";

import { getOffset } from "../node_modules/@mkbabb/animation/src/utils.js";

import { easeInBounce } from "../node_modules/@mkbabb/animation/src/math.js";

const title = document.querySelector<HTMLElement>(".title");
smoothAnimate(
    100,
    0,
    1000,
    (v) => {
        title.style.opacity = String(v);
        return null;
    },
    easeInBounce
);

const confettiSettings = { target: "confetti" };
const confetti = new ConfettiGenerator(confettiSettings);

const carouselSettings = {
    target: "#carousel",
    xTilt: 20,
    margin: 20,
    onfocus: (cell: HTMLVideoElement, i, angle) => {
        cell.classList.add("focused");

        cell.play();
    },
    onunfocus: (cell: HTMLVideoElement, i, angle) => {
        cell.classList.remove("focused");

        cell.pause();
    }
};
const carousel = new Carousel(carouselSettings);

document.querySelector("#rotate-btn").addEventListener("mousedown", () => {
    carousel.rollCarousel();
});

document.querySelector("#transpose-btn").addEventListener("mousedown", () => {
    carousel.transposeCarousel();
});

document.getElementById("shuffle-btn").addEventListener("mousedown", () => {
    carousel.shuffleCells();
});

document.getElementById("start-btn").addEventListener("click", async (event) => {
    const button = <HTMLElement>event.target;

    if (button.getAttribute("clicked") !== "true") {
        button.setAttribute("clicked", "true");

        confetti.render();

        Object.assign(button.style, {
            display: "none"
        });

        Object.assign(document.querySelector<HTMLElement>(".rotate-container").style, {
            transform: "translateY(0%)",
            opacity: "100%"
        });
        Object.assign(document.querySelector<HTMLElement>(".left").style, {
            opacity: "100%"
        });
        Object.assign(document.querySelector<HTMLElement>(".right").style, {
            opacity: "100%"
        });
    }
});
