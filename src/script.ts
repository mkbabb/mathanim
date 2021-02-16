import { default as ConfettiGenerator } from "../node_modules/confetti-js/src/confetti.js";

import { Carousel, sleep } from "./carousel.js";

export function throttle(func: (...args: any) => void, wait = 1000) {
    let enableCall = true;

    return function (...args: any) {
        if (!enableCall) return;

        enableCall = false;
        func(...args);
        setTimeout(() => (enableCall = true), wait);
    };
}

const confettiSettings = { target: "confetti" };
const confetti = new ConfettiGenerator(confettiSettings);

const carouselSettings = {
    target: "#carousel",
    xTilt: 20,
    margin: 10,
    zOffset: 0,

    onfocus: (cell: HTMLElement, i, angle) => {
        const video = cell.querySelector("video");
        cell.classList.add("focused");
        video.play();
    },
    onunfocus: (cell: HTMLElement, i, angle) => {
        const video = cell.querySelector("video");
        cell.classList.remove("focused");
        video.pause();
    }
};
const carousel = new Carousel(carouselSettings);

window.addEventListener(
    "resize",
    throttle(() => {
        carousel.rollCarousel();
    }, 100)
);

document.querySelector("#rotate-btn").addEventListener("mousedown", () => {
    carousel.rollCarousel();
});

window.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        carousel.rollCarousel();
    }
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
            transform: "translateY(-25%)",
            opacity: "0"
        });

        Object.assign(document.querySelector<HTMLElement>(".rotate-container").style, {
            transform: "translateY(0%)",
            opacity: "100%"
        });
    }
});
