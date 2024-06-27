export const crosshairElement = document.createElement("div");
crosshairElement.id = "crosshair";
crosshairElement.style.display = "none";

export function initCrosshair() {
    document.body.appendChild(crosshairElement);
}