import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { isLookingAt } from "./raycasting";
import { GUI, currentGUI, handleInteraction, openGUI } from "./gui";
import { scene } from "./scene";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { playSound } from "./audio";
import { decreaseLoadingCount } from "./loading";
import { clearOutline, outline } from "./outline";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/mcblock/");

export let mcblock: THREE.Object3D;

let isHighlighted = false;

const img = document.createElement("img");
img.src = "/assets/images/mcbook.png?url";
img.style.height = "70%";
img.draggable = false;
const discordImg = document.createElement("img");
discordImg.src = "/assets/images/discord.png?url";
discordImg.id = "discordlink";
discordImg.style.marginTop = "30px";
discordImg.style.height = "60px";
const discordLink = document.createElement("a");
discordLink.href = "https://discord.gg/eGNjMEQvhw";
discordLink.target = "_blank";
discordLink.appendChild(discordImg);
const gui = new GUI("mcbook", [img, discordLink])

export function loadMCBlock() {
    gltfLoader.load("scene.gltf", function(gltf) {
        mcblock = gltf.scene;
        mcblock.position.set(1.6, 0.2, 1.7);
        mcblock.scale.set(0.1, 0.1, 0.1);
        scene.add(mcblock)
        decreaseLoadingCount();
    })

    handleInteraction(open);
}

function open() {
    if(!isHighlighted) return;
    if(currentGUI == null) {
        if(openGUI(gui)) {
            playSound("open_book.mp3");
        }
    }
}

export function handleMCBlockRendering() {
    const looking = isLookingAt(mcblock);
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

    setTooltipWithPressE("Me & Minecraft");

    outline(mcblock);
}

function unhighlight() {
    isHighlighted = false;
    clearTooltip();
    clearOutline();
}