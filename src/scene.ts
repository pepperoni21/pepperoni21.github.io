import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

const gltfLoader = new GLTFLoader();
gltfLoader.setPath("assets/scene/");

gltfLoader.load(
  "scene.gltf",
  function(gltf) {
    scene.add(gltf.scene)
  },
  function(_xhr) {

  },
  function(_error) {
    
  }
)