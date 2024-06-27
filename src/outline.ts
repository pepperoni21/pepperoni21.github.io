import * as THREE from "three";
import { EffectComposer, GammaCorrectionShader, OutlinePass, RenderPass, ShaderPass } from "three/examples/jsm/Addons.js";
import { renderer } from "./main";
import { scene } from "./scene";
import { camera } from "./camera";

export let composer: EffectComposer;
let outlinePass: OutlinePass;

export function initOutline() {
    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    composer.addPass(outlinePass);
    
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);  
    composer.addPass(gammaCorrectionPass);
}

export function outline(object: THREE.Object3D) {
    outlinePass.selectedObjects = [object];
}

export function clearOutline() {
    outlinePass.selectedObjects = [];
}