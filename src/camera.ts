import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

const INITIAL_POSITION = new THREE.Vector3(0.6, 0.9, 0.4);
const INITIAL_ROTATION = new THREE.Euler(3, -1, 3)

export let camera: THREE.PerspectiveCamera;

export function loadCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(INITIAL_POSITION);
    camera.rotation.copy(INITIAL_ROTATION);
    return camera;
}

export let controls: PointerLockControls;

export function loadControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    controls = new PointerLockControls(camera, renderer.domElement);
    controls.lock();
    return controls;
}