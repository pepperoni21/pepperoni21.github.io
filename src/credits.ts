import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { scene } from "./scene";
import { isLookingAt } from "./raycasting";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { decreaseLoadingCount } from "./loading";
import { clearOutline, outline } from "./outline";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/credits/");

export let credits: THREE.Object3D;

let isHighlighted = false;

export function loadCredits() {
    gltfLoader.load("credits.glb", function(gltf) {
        credits = gltf.scene;
        credits.position.set(-0.5, 0.3, -0.3);
        credits.scale.set(0.1, 0.1, 0.1);
        scene.add(credits)
        decreaseLoadingCount();
    })
}

export function handleCreditsRendering() {
    const looking = isLookingAt(credits);
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

    outline(credits);
    setTooltipWithPressE("Credits");
}

function unhighlight() {
    isHighlighted = false;
    clearOutline();
    clearTooltip();
}