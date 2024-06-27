import * as THREE from "three";
import { camera } from "./camera";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

export function init() {
    window.addEventListener("pointermove", onPointerMove);
}

function onPointerMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export function isLookingAt(object: THREE.Object3D) {
    if(!object) return false;
    
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(object, true);
    
    return intersects.length > 0;
}