const displayType = new Map();

export function hideElement(element: HTMLElement) {
    displayType.set(element, element.style.display);
    element.style.display = "none";
}

export function showElement(element: HTMLElement) {
    let style = displayType.has(element) ? displayType.get(element) : "block";
    element.style.display = style;
    displayType.delete(element);
}

export function createLinkDiv(element: HTMLElement, url: string) {
    const linkDiv = document.createElement("a");
    linkDiv.href = url;
    linkDiv.target = "_blank";
    linkDiv.appendChild(element);
    return linkDiv;
}

export function createImg(url: string, size?: number) {
    const element = document.createElement("img");
    element.src = url;
    element.draggable = false;
    if(size) element.width = size;
    return element;
}