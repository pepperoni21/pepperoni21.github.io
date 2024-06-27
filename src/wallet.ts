import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { scene } from "./scene";
import * as THREE from "three";
import { isLookingAt } from "./raycasting";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { GUI, currentGUI, handleInteraction, openGUI } from "./gui";
import { playSound } from "./audio";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/wallet/");

export let wallet: THREE.Object3D;

let isHighlighted = false;

const img = document.createElement("img");
img.src = "/assets/images/id.png?url";
img.style.height = "100%";
img.draggable = false;
const gui = new GUI("idcard", [img])

export function loadWallet() {
    gltfLoader.load("scene.gltf", function(gltf) {
        wallet = gltf.scene;
        wallet.traverse(function(child) {
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
        wallet.position.set(1.05, 0.2, 0.8);
        wallet.scale.set(0.03, 0.03, 0.03);
        scene.add(wallet)
    })

    handleInteraction(open)
}

function open() {
    if(!isHighlighted) return;
    if(currentGUI == null) {
        if(openGUI(gui)) {
            playSound("open_wallet.mp3")
        }
    }
}

export function handleWalletRendering() {
    const looking = isLookingAt(wallet);
    if(looking && isHighlighted) return;
    if(!looking && !isHighlighted) return;
    if(looking) {
        highlight();
    } else {
        unhighlight();
    }
}

function highlight() {
    wallet.traverse(function(child) {
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

    setTooltipWithPressE("About me");
}

function unhighlight() {
    wallet.traverse(function(child) {
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