import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { scene } from "./scene";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { isLookingAt } from "./raycasting";
import { GUI, currentGUI, openGUI } from "./gui";
import { createImg, createLinkDiv } from "./utils";
import { decreaseLoadingCount } from "./loading";

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
        mailbox.traverse(function(child) {
            if(child instanceof THREE.Mesh) {
                let material = (child as THREE.Mesh).material;
                if(material instanceof Array) {
                    for(let i = 0; i < material.length; i++) {
                        (material[i] as THREE.MeshStandardMaterial).emissive = new THREE.Color(0xffffff);
                        (material[i] as THREE.MeshStandardMaterial).emissiveIntensity = 0;
                    }
                } else {
                    (material as THREE.MeshStandardMaterial).emissive = new THREE.Color(0xffffff);
                    (material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
                }
            }
        });
        mailbox.position.set(1.5, -0.2, 2.8);
        mailbox.scale.set(0.008, 0.008, 0.008);
        mailbox.rotateY(Math.PI + 0.2);
        scene.add(mailbox)
        decreaseLoadingCount();
    })

    document.addEventListener('keypress', event => {
        if(event.key != 'e') return;
        if(!isHighlighted) return;
        if(currentGUI == null) {
            openGUI(gui);
        }
    })
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
    mailbox.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
            let material = (child as THREE.Mesh).material;
            if(material instanceof Array) {
                for(let i = 0; i < material.length; i++) {
                    (material[i] as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
                }
            } else {
                (material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
            }
        }
    });
    isHighlighted = true;

    setTooltipWithPressE("Contact");
}

function unhighlight() {
    mailbox.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
            let material = (child as THREE.Mesh).material;
            if(material instanceof Array) {
                for(let i = 0; i < material.length; i++) {
                    (material[i] as THREE.MeshStandardMaterial).emissiveIntensity = 0;
                }
            } else {
                (material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
            }
        }
    });
    isHighlighted = false;
    clearTooltip();
}