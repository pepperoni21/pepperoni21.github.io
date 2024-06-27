import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { scene } from "./scene";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { isLookingAt } from "./raycasting";
import { GUI, currentGUI, handleInteraction, openGUI } from "./gui";
import { createImg, createLinkDiv } from "./utils";
import { decreaseLoadingCount } from "./loading";
import { clearOutline, outline } from "./outline";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/mailbox/");

export let mailbox: THREE.Object3D;

let isHighlighted = false;

const img = createImg("/assets/images/contact.png?url");
img.style.height = "70%";
img.style.borderRadius = "10%";

const contactDiv = document.createElement("div");
contactDiv.id = "contact";

const githubImg = createImg("/assets/images/github.png?url", 40);
const githubLinkDiv = createLinkDiv(githubImg, "https://github.com/pepperoni21");
const emailImg = createImg("/assets/images/mail.png?url", 40)
const emailLinkDiv = createLinkDiv(emailImg, "mailto:pepperoni2100@gmail.com");
const twitterImg = createImg("/assets/images/twitter.png?url", 40);
const twitterLinkDiv = createLinkDiv(twitterImg, "https://twitter.com/peps2111");
contactDiv.appendChild(githubLinkDiv);
contactDiv.appendChild(emailLinkDiv);
contactDiv.appendChild(twitterLinkDiv);
const gui = new GUI("contact", [img, contactDiv])

export function loadMailbox() {
    gltfLoader.load("scene.gltf", function(gltf) {
        mailbox = gltf.scene;
        mailbox.position.set(1.5, -0.1, 2.8);
        mailbox.scale.set(0.008, 0.008, 0.008);
        mailbox.rotateY(Math.PI + 0.2);
        scene.add(mailbox)
        decreaseLoadingCount();
    })

    handleInteraction(open);
}

function open() {
    if(!isHighlighted) return;
    if(currentGUI == null) {
        openGUI(gui);
    }
}

export function handleMailboxRendering() {
    const looking = isLookingAt(mailbox);
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

    outline(mailbox);
    setTooltipWithPressE("Contact");
}

function unhighlight() {
    clearOutline();
    isHighlighted = false;
    clearTooltip();
}