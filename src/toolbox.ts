import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { isLookingAt } from "./raycasting";
import { currentGUI } from "./gui";
import { scene } from "./scene";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";
import { decreaseLoadingCount } from "./loading";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/toolbox/");

export let toolbox: THREE.Object3D;

let isHighlighted = false;

export function loadToolbox() {
    gltfLoader.load("scene.gltf", function(gltf) {
        toolbox = gltf.scene;
        toolbox.traverse(function(child) {
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
    toolbox.traverse(function(child) {
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

    setTooltipWithPressE("My skills");
}

function unhighlight() {
    toolbox.traverse(function(child) {
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