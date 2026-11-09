import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function woodTexture(renderer) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const g = c.getContext("2d");
  g.fillStyle = "#4a2c18";
  g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 520; i++) {
    const x = Math.random() * 1024;
    const w = 1 + Math.random() * 4;
    const l = 140 + Math.random() * 600;
    const y = Math.random() * 1024;
    g.fillStyle = `rgba(${Math.random() < 0.5 ? "20,10,4" : "120,76,42"},${0.08 + Math.random() * 0.18})`;
    g.fillRect(x, y, w, l);
  }
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

export function createStudio(renderer, { scale = 1, facing = 1, withTable = true, shadowSize = 2048 } = {}) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2e2f31);
  scene.fog = new THREE.Fog(0x2e2f31, 6 * scale, 16 * scale);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  room.dispose();
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.18;

  const key = new THREE.DirectionalLight(0xffe2c0, 1.1);
  key.position.set(3 * scale, 5 * scale, 4 * scale * facing);
  key.castShadow = true;
  key.shadow.mapSize.set(shadowSize, shadowSize);
  Object.assign(key.shadow.camera, {
    left: -3 * scale, right: 3 * scale, top: 3 * scale, bottom: -3 * scale,
    near: scale, far: 14 * scale
  });
  key.shadow.bias = -0.0004;
  scene.add(key, new THREE.HemisphereLight(0x8a93a8, 0x1a120c, 0.35));

  let table = null;
  if (withTable) {
    table = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6 * scale, 3.6 * scale, 0.1 * scale, 96),
      new THREE.MeshStandardMaterial({ map: woodTexture(renderer), roughness: 0.55, metalness: 0.05 })
    );
    table.receiveShadow = true;
    scene.add(table);
  }

  return {
    scene,
    table,
    dispose() {
      key.shadow.dispose();
      environment.dispose();
      pmrem.dispose();
    }
  };
}
