import * as THREE from 'three';
import { scene } from './scene';
import { createImg } from './utils';

const listener = new THREE.AudioListener();
const backgroundSound = new THREE.Audio(listener);
const fireSound = new THREE.PositionalAudio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.setPath("assets/sounds/");

const MUTED_IMG = "/assets/images/sound_off.png?url";
const UNMUTED_IMG = "/assets/images/sound_on.png?url";

const audioDiv = document.createElement("div")
audioDiv.id = "audio";
const mDiv = document.createElement("div");
mDiv.id = "audio_key";
mDiv.innerText = "M";
audioDiv.appendChild(mDiv);
const muteImg = createImg(UNMUTED_IMG);
muteImg.height = 40;

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

    camera.add(listener);

    document.body.appendChild(audioDiv);
    audioDiv.appendChild(muteImg);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial();
    material.visible = false;
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(3, 0, 2);
    scene.add(sphere);
    sphere.add(fireSound);

    document.addEventListener("keypress", event => {
        if(event.key != "m") return;
        toggleMute();
    })
}

export function playSound(name: string) {
    const sound = new THREE.Audio(listener);
    audioLoader.load(name, function(buffer) {
        sound.setBuffer(buffer);
        sound.setVolume(0.5);
        sound.play();
    });
}

function toggleMute() {
    if(isMuted()) {
        listener.setMasterVolume(1);
        muteImg.src = UNMUTED_IMG;
    } else {
        listener.setMasterVolume(0);
        muteImg.src = MUTED_IMG;
    }
}

function isMuted() {
    return listener.getMasterVolume() == 0;
}