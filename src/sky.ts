import * as THREE from 'three';
import { scene } from './scene';
import { decreaseLoadingCount } from './loading';

export function loadSky() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath("assets/skybox/")
    const textureCube = cubeTextureLoader.load([
    "_left.png", "_right.png",
    "_top.png", "_bottom.png",
    "_front.png", "_back.png"
    ]);
    scene.background = textureCube;
    decreaseLoadingCount();
}