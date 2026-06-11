import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.156.0/examples/jsm/loaders/GLTFLoader.js';

const canvasContainer = document.getElementById('cameraDisplay');
const cameraOverlay = document.getElementById('cameraOverlay');
const modelPath = 'assets/models/canon1300d.glb';

let scene, camera, renderer, clock, modelGroup;
let randomYawOffset = Math.random() * Math.PI * 2;
let randomPitchOffset = (Math.random() - 0.5) * 0.4;
let targetPointerX = 0;
let targetPointerY = 0;
let pointerX = 0;
let pointerY = 0;
let manualYaw = 0;
let manualPitch = 0;
let dragStartX = 0;
let dragStartY = 0;
let dragStartYaw = 0;
let dragStartPitch = 0;
let isDragging = false;
const rotateSpeed = 0.42;
const pointerEase = 0.08;
const dragSensitivityX = 0.0055;
const dragSensitivityY = 0.0035;
const baseModelY = 1.0;

function createPlaceholderCamera() {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x191919, metalness: 0.65, roughness: 0.35 });
  const lensMaterial = new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.4, roughness: 0.22 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.2, 1.4), bodyMaterial);
  body.position.set(0, 0, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.4, 36), lensMaterial);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(2.1, 0, 0);
  lens.castShadow = true;
  group.add(lens);

  const topKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 28), bodyMaterial);
  topKnob.rotation.z = Math.PI / 2;
  topKnob.position.set(-1.25, 0.9, 0.2);
  group.add(topKnob);

  const viewfinder = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.6, 0.7), bodyMaterial);
  viewfinder.position.set(-1.25, 0.35, -0.2);
  group.add(viewfinder);

  const detailMaterial = new THREE.MeshStandardMaterial({ color: 0xff4d4d, emissive: 0x440000, emissiveIntensity: 0.05, metalness: 0.2, roughness: 0.3 });
  const flash = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), detailMaterial);
  flash.position.set(1.3, 0.75, 0.55);
  group.add(flash);

  return group;
}

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  const width = canvasContainer.clientWidth;
  const height = canvasContainer.clientHeight;

  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
  camera.position.set(0, 1.9, 6.2);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  if ('outputColorSpace' in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  canvasContainer.appendChild(renderer.domElement);

  const ambient = new THREE.HemisphereLight(0xffffff, 0x080808, 0.9);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffd8d8, 0.8);
  directional.position.set(5, 5, 5);
  directional.castShadow = true;
  scene.add(directional);

  const fillLight = new THREE.DirectionalLight(0x8f9fff, 0.35);
  fillLight.position.set(-4, -1, 3);
  scene.add(fillLight);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(8, 64),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.85, metalness: 0.05 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.5;
  scene.add(ground);

  const grid = new THREE.GridHelper(14, 14, 0x333333, 0x111111);
  grid.position.y = -1.49;
  scene.add(grid);

  modelGroup = new THREE.Group();
  scene.add(modelGroup);

  // Try to load GLB model, otherwise fallback to placeholder.
  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const loaded = gltf.scene;
      loaded.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.needsUpdate = true;
        }
      });
      const bbox = new THREE.Box3().setFromObject(loaded);
      const size = bbox.getSize(new THREE.Vector3());
      const center = bbox.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 2.64; // 20% larger
      const scale = targetSize / maxDim;
      loaded.scale.setScalar(scale);
      loaded.position.x -= center.x * scale;
      loaded.position.y -= center.y * scale;
      loaded.position.z -= center.z * scale;
      loaded.position.y = baseModelY;
      modelGroup.add(loaded);
    },
    undefined,
    () => {
      const fallback = createPlaceholderCamera();
      fallback.scale.setScalar(1.2);
      fallback.position.set(0, baseModelY, 0);
      modelGroup.add(fallback);
    }
  );

  clock = new THREE.Clock();
  animate();
}

function animate() {
  const elapsed = clock.getElapsedTime();
  pointerX += (targetPointerX - pointerX) * pointerEase;
  pointerY += (targetPointerY - pointerY) * pointerEase;

  if (modelGroup) {
    modelGroup.rotation.y = randomYawOffset + elapsed * rotateSpeed + manualYaw;
    modelGroup.rotation.x = randomPitchOffset + (isDragging ? manualPitch : pointerY) + Math.sin(elapsed * 0.35) * 0.04;
    modelGroup.rotation.z = pointerX * 0.35;
    modelGroup.position.x = pointerX * 0.18;
    modelGroup.position.y = baseModelY + Math.sin(elapsed * 0.7) * 0.06;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize() {
  const width = canvasContainer.clientWidth;
  const height = canvasContainer.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

canvasContainer.addEventListener('mouseenter', () => {
  cameraOverlay.classList.add('active');
});
canvasContainer.addEventListener('mouseleave', () => {
  cameraOverlay.classList.remove('active');
});

canvasContainer.addEventListener('pointermove', (event) => {
  const rect = canvasContainer.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  targetPointerX = x * 0.15;
  targetPointerY = y * 0.1;

  if (isDragging) {
    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;
    manualYaw = dragStartYaw + deltaX * dragSensitivityX;
    manualPitch = THREE.MathUtils.clamp(dragStartPitch + deltaY * dragSensitivityY, -0.45, 0.45);
  }
});

canvasContainer.addEventListener('pointerdown', (event) => {
  if (event.isPrimary) {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragStartYaw = manualYaw;
    dragStartPitch = manualPitch;
    canvasContainer.setPointerCapture(event.pointerId);
  }
});

canvasContainer.addEventListener('pointerup', (event) => {
  if (event.isPrimary) {
    isDragging = false;
    canvasContainer.releasePointerCapture(event.pointerId);
  }
});

canvasContainer.addEventListener('pointercancel', () => {
  isDragging = false;
});

canvasContainer.addEventListener('pointerleave', () => {
  if (!isDragging) {
    targetPointerX = 0;
    targetPointerY = 0;
  }
});

window.addEventListener('resize', resize);
initScene();
