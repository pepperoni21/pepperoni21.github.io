import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { scene } from "./scene";
import { isLookingAt } from "./raycasting";
import { clearTooltip, setTooltipWithPressE } from "./tooltip";

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/credits/");

export let credits: THREE.Object3D;

let isHighlighted = false;

export function loadCredits() {
    gltfLoader.load("credits.glb", function(gltf) {
        credits = gltf.scene;
        credits.traverse(function(child) {
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
        credits.position.set(-0.5, 0.3, -0.3);
        credits.scale.set(0.1, 0.1, 0.1);
        scene.add(credits)
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
    credits.traverse(function(child) {
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

    setTooltipWithPressE("Credits");
}

function unhighlight() {
    credits.traverse(function(child) {
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