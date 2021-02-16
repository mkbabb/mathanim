var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { default as ConfettiGenerator } from "../node_modules/confetti-js/src/confetti.js";
import { Carousel } from "./carousel.js";
export function throttle(func, wait = 1000) {
    let enableCall = true;
    return function (...args) {
        if (!enableCall)
            return;
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
    onfocus: (cell, i, angle) => {
        const video = cell.querySelector("video");
        cell.classList.add("focused");
        video.play();
    },
    onunfocus: (cell, i, angle) => {
        const video = cell.querySelector("video");
        cell.classList.remove("focused");
        video.pause();
    }
};
const carousel = new Carousel(carouselSettings);
window.addEventListener("resize", throttle(() => {
    carousel.rollCarousel();
}, 100));
document.querySelector("#rotate-btn").addEventListener("mousedown", () => {
    carousel.rollCarousel();
});
document.querySelector("#info-btn").addEventListener("mousedown", (ev) => {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("active");
    scrollTo(0, 0);
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
document.getElementById("start-btn").addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const button = event.target;
    if (button.getAttribute("clicked") !== "true") {
        button.setAttribute("clicked", "true");
        confetti.render();
        Object.assign(button.style, {
            transform: "translateY(-25%)",
            opacity: "0"
        });
        Object.assign(document.querySelector(".rotate-container").style, {
            transform: "translateY(0%)",
            opacity: "100%"
        });
    }
}));
//# sourceMappingURL=script.js.map