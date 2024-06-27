import { crosshairElement } from "./crosshair";
import { start } from "./main";
import { hideElement, showElement } from "./utils";

export function initInstructions() {
    let instructionsElement = generateInstructionsElement();
    document.body.appendChild(instructionsElement);

    instructionsElement.addEventListener('click', function() {
        hideElement(instructionsElement);
        let eyeElement = generateEyeElement();
        document.body.appendChild(eyeElement);
        eyeElement.addEventListener("animationend", _ => {
            hideElement(eyeElement);
            showElement(crosshairElement);
        })
        start();
    });
}

function generateInstructionsElement() {
    let instructionsElement = document.createElement('div');
    instructionsElement.id = 'instructions';
    instructionsElement.innerHTML = `
    <h1>
      Click to start
    </h1>
    `;
    return instructionsElement;
}

function generateEyeElement() {
    let eyeElement = document.createElement('div');
    eyeElement.id = 'eye';
    eyeElement.innerHTML = `
    <div class="eye">
        <div class="eye-lid top"></div>
        <div class="eye-lid bottom"></div>
    </div>
    `;
    return eyeElement;
}