import { default as ConfettiGenerator } from "../node_modules/confetti-js/src/confetti.js";

import { Carousel, sleep } from "./carousel.js";

const confettiSettings = { target: "confetti" };
const confetti = new ConfettiGenerator(confettiSettings);

const carouselSettings = {
    target: "#carousel",
    onfocus: (cell: HTMLVideoElement, i, angle) => {
        cell.play();
    },
    onunfocus: (cell: HTMLVideoElement, i, angle) => {
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

        await sleep(500);

        document.querySelector(".side-left .image").classList.add("floating");
        document.querySelector(".side-right .image").classList.add("floating");
    }
});
