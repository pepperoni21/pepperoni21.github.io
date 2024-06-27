export const tooltipElement = generateTooltipElement();

export function initTooltip() {
    document.body.appendChild(tooltipElement);
}

export function setTooltip(text: string) {
    tooltipElement.innerHTML = text;
}

export function setTooltipWithPressE(text: string) {
    tooltipElement.innerHTML = text + "<br>Press E to interact";
}

export function clearTooltip() {
    tooltipElement.innerHTML = "";
}

function generateTooltipElement() {
    const tooltipElement = document.createElement("div");
    tooltipElement.id = "tooltip";
    return tooltipElement;
}