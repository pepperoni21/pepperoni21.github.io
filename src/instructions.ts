import { crosshairElement } from "./crosshair";
import { start } from "./main";
import { hideElement, showElement } from "./utils";

export function initInstructions() {
    let instructionsElement = generateInstructionsElement();
    document.body.appendChild(instructionsElement);

    instructionsElement.addEventListener('click', function() {
        instructionsElement.style.display = 'none';
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
    <div id="instructions">
      <h1>
        Click to start
      </h1>
    </div>
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