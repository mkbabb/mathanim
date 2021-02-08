var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function radians(x) {
    return (Math.PI * x) / 180;
}
export class Carousel {
    constructor(settings) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.target = document.querySelector(settings.target);
        this.focusedCell = (_a = document.querySelector(settings.focusedCell)) !== null && _a !== void 0 ? _a : this.target.children[0];
        const func = (cell, i, angle) => {
            return null;
        };
        this.onfocus = (_b = settings.onfocus) !== null && _b !== void 0 ? _b : func;
        this.onunfocus = (_c = settings.onunfocus) !== null && _c !== void 0 ? _c : func;
        this.xTilt = (_d = settings.xTilt) !== null && _d !== void 0 ? _d : 10;
        this.zOffset = (_e = settings.zOffset) !== null && _e !== void 0 ? _e : 0;
        this.axis = (_f = settings.axis) !== null && _f !== void 0 ? _f : "Y";
        this.index = 0;
        this.margin = (_g = settings.margin) !== null && _g !== void 0 ? _g : 10;
    }
    getCellWidth() {
        if (this.axis == "X") {
            return this.target.offsetHeight + this.margin;
        }
        else {
            return this.target.offsetWidth + this.margin;
        }
    }
    calcAngle() {
        const cellCount = this.target.children.length;
        return (2 * Math.PI) / cellCount;
    }
    calcRadius(width) {
        return Math.ceil((width / 2) * (1 / Math.tan(this.calcAngle() / 2)));
    }
    rollCarousel() {
        const cellCount = this.target.children.length;
        const radius = this.calcRadius(this.getCellWidth());
        const alpha = this.calcAngle();
        if (this.axis == "Y") {
            const tiltYOffset = (radius + this.zOffset) * Math.sin(radians(this.xTilt));
            Object.assign(this.target.style, {
                transform: `translateY(-${tiltYOffset}px) translateZ(${this.zOffset}px) rotateX(-${this.xTilt}deg)`
            });
        }
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
        this.axis = this.axis == "X" ? "Y" : "X";
        const radius = this.calcRadius(this.getCellWidth());
        this.target.style.transform = `translateZ(${-radius}px)`;
        this.rollCarousel();
    }
    shuffleCells() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 3; i++) {
                this.transposeCarousel();
                yield sleep(250);
            }
            this.transposeCarousel();
            this.rollCarousel();
        });
    }
}
//# sourceMappingURL=carousel.js.map