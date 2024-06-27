import * as THREE from 'three';
import { scene } from './scene';

const listener = new THREE.AudioListener();
const backgroundSound = new THREE.Audio(listener);
const fireSound = new THREE.PositionalAudio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.setPath("assets/sounds/");

export function loadAudio(camera: THREE.PerspectiveCamera) {
    audioLoader.load("background.mp3", function(buffer) {
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(true);
        backgroundSound.setVolume(0.05);
        backgroundSound.play();
    });
    audioLoader.load("fire.mp3", function(buffer) {
        fireSound.setBuffer(buffer);
        fireSound.setLoop(true);
        fireSound.setRefDistance(20);
        fireSound.setVolume(0.05);
        fireSound.play();
    });

    camera.add(listener)

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial();
    material.visible = false;
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(3, 0, 2);
    scene.add(sphere);
    sphere.add(fireSound);
}

export function playSound(name: string) {
    const sound = new THREE.Audio(listener);
    audioLoader.load(name, function(buffer) {
        sound.setBuffer(buffer);
        sound.setVolume(0.5);
        sound.play();
    });
}