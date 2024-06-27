import { controls } from "./camera";
import { crosshairElement } from "./crosshair";
import { tooltipElement } from "./tooltip";
import { hideElement, showElement } from "./utils";

let guiCooldown = false;

export class GUI {
    public name: string;
    public content: HTMLElement[];

    constructor(name: string, content: HTMLElement[]) {
        this.name = name;
        this.content = content;
    }

    public getElement(): HTMLElement | null {
        return document.getElementById("gui_" + this.name);
    }
}

export let currentGUI: GUI | null = null;

document.addEventListener("keydown", event => {
    if(currentGUI == null) return;
    if(event.key == "e") {
        closeGUI();
    }
});

export function handleInteraction(callback: () => void) {
    document.addEventListener("keypress", event => {
        if(event.key != 'e') return;
        callback();
    })

    document.addEventListener('click', event => {
        if(event.button != 0) return;
        callback();
    });
}

export function openGUI(gui: GUI): boolean {
    if(guiCooldown) return false;

    const element = document.createElement("div");
    element.classList.add("gui");
    element.id = "gui_" + gui.name;
    gui.content.forEach(child => element.appendChild(child))
    document.body.appendChild(element);
    currentGUI = gui;

    element.addEventListener("click", event => {
        if(event.button != 0) return;
        if(event.target != element) return;
        closeGUI();
    })

    hideElement(tooltipElement);
    hideElement(crosshairElement);

    controls.unlock();

    return true;
}

export function closeGUI() {
    const element = currentGUI?.getElement();
    currentGUI = null;
    if(!element) return;
    document.body.removeChild(element)
    controls.lock();
    startCooldown(1);

    showElement(tooltipElement);
    showElement(crosshairElement);
}

export function startCooldown(time: number) {
    guiCooldown = true;
    setTimeout(() => guiCooldown = false, 1000 * time);
}