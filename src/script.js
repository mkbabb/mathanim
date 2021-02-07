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
import { smoothAnimate } from "../node_modules/@mkbabb/animation/src/animation.js";
import { easeInBounce } from "../node_modules/@mkbabb/animation/src/math.js";
const title = document.querySelector(".title");
smoothAnimate(100, 0, 1000, (v) => {
    title.style.opacity = String(v);
    return null;
}, easeInBounce);
const confettiSettings = { target: "confetti" };
const confetti = new ConfettiGenerator(confettiSettings);
const carouselSettings = {
    target: "#carousel",
    xTilt: 20,
    margin: 20,
    onfocus: (cell, i, angle) => {
        cell.classList.add("focused");
        cell.play();
    },
    onunfocus: (cell, i, angle) => {
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
document.getElementById("start-btn").addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const button = event.target;
    if (button.getAttribute("clicked") !== "true") {
        button.setAttribute("clicked", "true");
        confetti.render();
        Object.assign(button.style, {
            display: "none"
        });
        Object.assign(document.querySelector(".rotate-container").style, {
            transform: "translateY(0%)",
            opacity: "100%"
        });
        Object.assign(document.querySelector(".left").style, {
            opacity: "100%"
        });
        Object.assign(document.querySelector(".right").style, {
            opacity: "100%"
        });
    }
}));
//# sourceMappingURL=script.js.map