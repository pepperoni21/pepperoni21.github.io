import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { isLookingAt } from "./raycasting";
import { currentGUI } from "./gui";
import { scene } from "./scene";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { decreaseLoadingCount } from "./loading";
import { clearOutline, outline } from "./outline";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/toolbox/");

export let toolbox: THREE.Object3D;

let isHighlighted = false;

export function loadToolbox() {
    gltfLoader.load("scene.gltf", function(gltf) {
        toolbox = gltf.scene;
        toolbox.position.set(2.8, 0.2, 0.5);
        toolbox.rotateY(-Math.PI / 2)
        scene.add(toolbox);
        decreaseLoadingCount();
    })

    document.addEventListener('keypress', event => {
        if(event.key != 'e') return;
        if(!isHighlighted) return;
        if(currentGUI == null) {
            //openGUI(gui)
        }
    })
}

export function handleToolboxRendering() {
    const looking = isLookingAt(toolbox);
    if(looking && isHighlighted) return;
    if(!looking && !isHighlighted) return;
    if(looking) {
        highlight();
    } else {
        unhighlight();
    }
}

function highlight() {
    isHighlighted = true;

    outline(toolbox);

    setTooltipWithPressE("My skills");
}

function unhighlight() {
    isHighlighted = false;
    clearTooltip();
    clearOutline();
}