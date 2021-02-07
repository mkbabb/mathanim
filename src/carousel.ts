import { getOffset } from "../node_modules/@mkbabb/animation/src/utils.js";

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function radians(x: number) {
    return (Math.PI * x) / 180;
}

type CellFunction = (cell: HTMLElement, index: number, angle: number) => void;

interface CarouselSettings {
    target?: string;
    focusedCell?: string;

    onfocus?: CellFunction;
    onunfocus?: CellFunction;

    axis?: string;
    index?: number;
    margin?: number;

    xTilt?: number;
}

export class Carousel {
    target: HTMLElement;
    focusedCell: HTMLElement;

    onfocus: CellFunction;
    onunfocus: CellFunction;

    axis: string;
    index: number;
    margin: number;

    xTilt: number;

    constructor(settings: CarouselSettings) {
        this.target = document.querySelector(settings.target);
        this.focusedCell =
            document.querySelector<HTMLElement>(settings.focusedCell) ??
            <HTMLElement>this.target.children[0];

        const func: CellFunction = (cell, i, angle) => {
            return null;
        };

        this.onfocus = settings.onfocus ?? func;
        this.onunfocus = settings.onunfocus ?? func;

        this.xTilt = settings.xTilt ?? 10;

        this.axis = settings.axis ?? "Y";
        this.index = 0;
        this.margin = settings.margin ?? 10;
    }

    getCellWidth(): number {
        if (this.axis == "X") {
            return this.target.offsetHeight + this.margin;
        } else {
            return this.target.offsetWidth + this.margin;
        }
    }

    calcAngle(): number {
        const cellCount = this.target.children.length;
        return (2 * Math.PI) / cellCount;
    }

    calcRadius(width: number): number {
        return Math.ceil((width / 2) * (1 / Math.tan(this.calcAngle() / 2)));
    }

    rollCarousel(): void {
        const cellCount = this.target.children.length;
        const radius = this.calcRadius(this.getCellWidth());
        const alpha = this.calcAngle();

        if (this.axis == "Y") {
            const tiltYOffset = radius * Math.sin(radians(this.xTilt));

            Object.assign(this.target.style, {
                transform: `translateY(-${tiltYOffset}px) rotateX(-${this.xTilt}deg)`
            });
        }

        Array.from(this.target.children).forEach((child: HTMLElement, i) => {
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

    transposeCarousel(): void {
        this.axis = this.axis == "X" ? "Y" : "X";
        const radius = this.calcRadius(this.getCellWidth());
        this.target.style.transform = `translateZ(${-radius}px)`;

        this.rollCarousel();
    }

    async shuffleCells(): Promise<void> {
        for (let i = 0; i < 3; i++) {
            this.transposeCarousel();
            await sleep(250);
        }
        this.transposeCarousel();
        this.rollCarousel();
    }
}
