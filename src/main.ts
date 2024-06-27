import * as THREE from 'three';
import { loadSky } from './sky';
import { loadCamera, loadControls } from './camera';
import { loadAudio } from './audio';
import "../styles/app.css";
import { scene } from './scene';
import { handleWalletRendering, loadWallet, wallet } from './wallet';
import { initTooltip } from './tooltip';
import { credits, handleCreditsRendering, loadCredits } from './credits';
import { currentGUI, startCooldown } from './gui';
import { handleMCBlockRendering, loadMCBlock, mcblock } from './mcblock';
import { handleMailboxRendering, loadMailbox, mailbox } from './mailbox';
import { initCrosshair } from './crosshair';
import { handleToolboxRendering, loadToolbox, toolbox } from './toolbox';
import { initLoadingScreen } from './loading';


loadSky();
loadWallet();
loadCredits();
loadMCBlock();
loadMailbox();
loadToolbox();

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

export const camera = loadCamera();

document.body.appendChild(renderer.domElement);
initLoadingScreen();
initTooltip();
initCrosshair();

function animate() {
  renderer.render(scene, camera);

  if(wallet) handleWalletRendering();
  if(credits) handleCreditsRendering();
  if(mcblock) handleMCBlockRendering();
  if(mailbox) handleMailboxRendering();
  if(toolbox) handleToolboxRendering();
}

renderer.setAnimationLoop(animate);

export function start() {
  const controls = loadControls(camera, renderer);

  loadAudio(camera);

  document.addEventListener('click', function() {
    if(currentGUI != null) return;
    controls.lock();
  });

  startCooldown(2);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);