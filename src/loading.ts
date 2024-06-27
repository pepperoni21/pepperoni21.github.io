import { initInstructions } from "./instructions";
import { hideElement } from "./utils";

export let loadingCount = 6;

const loadingElement = generateLoadingElement();

export function initLoadingScreen() {
    document.body.appendChild(loadingElement);
}

function generateLoadingElement() {
    let instructionsElement = document.createElement('div');
    instructionsElement.id = 'loading';
    instructionsElement.innerHTML = `
    <h1>
        Loading
    </h1>
    `;
    return instructionsElement;
}

export function decreaseLoadingCount(times?: number) {
    if(times) {
        loadingCount -= times;
    } else {
        loadingCount--;
    }

    if(loadingCount == 0) {
        finishLoading();
    }
}

function finishLoading() {
    hideElement(loadingElement);
    initInstructions();
}