import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { toCreasedNormals } from "three/addons/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const MATERIALS = {
  shell: () => new THREE.MeshStandardMaterial({
    color: 0xf3e3cc,
    emissive: 0xffb866,
    emissiveIntensity: 0.55,
    roughness: 0.45,
    metalness: 0
  }),
  stand: () => new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.38, metalness: 0.75 }),
  disc_front: () => new THREE.MeshStandardMaterial({ color: 0x7a2208, emissive: 0xa63a12, emissiveIntensity: 0.35, roughness: 0.5 }),
  disc_back: () => new THREE.MeshStandardMaterial({ color: 0x7a2208, emissive: 0xa63a12, emissiveIntensity: 0.35, roughness: 0.5 }),
  cable: () => new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.55 }),
  plug: () => new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.4 })
};

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
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

export function createModelViewer(host, { src, finish, onReady, onError }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2e2f31);
  scene.fog = new THREE.Fog(0x2e2f31, 6, 16);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.18;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(-2.6, 1.3, 4.6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, -0.1, 0);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2;
  controls.maxDistance = 9;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.addEventListener("start", () => { controls.autoRotate = false; });

  const key = new THREE.DirectionalLight(0xffe2c0, 1.1);
  key.position.set(3, 5, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 14 });
  key.shadow.bias = -0.0004;
  scene.add(key, new THREE.HemisphereLight(0x8a93a8, 0x1a120c, 0.35));

  const glow = new THREE.PointLight(0xffa850, 3.2, 5, 1.6);
  glow.position.set(0, 0.1, 0.9);
  const glowBack = glow.clone();
  glowBack.position.z = -0.9;
  if (finish !== "orange-plastic") scene.add(glow, glowBack);

  const table = new THREE.Mesh(
    new THREE.CylinderGeometry(3.6, 3.6, 0.1, 96),
    new THREE.MeshStandardMaterial({ map: woodTexture(renderer), roughness: 0.55, metalness: 0.05 })
  );
  table.material.map.repeat.set(2, 2);
  table.receiveShadow = true;
  scene.add(table);

  let disposed = false;
  let visible = true;

  new GLTFLoader().load(src, gltf => {
    if (disposed) return;
    const model = gltf.scene;
    model.traverse(o => {
      if (!o.isMesh) return;
      o.geometry.deleteAttribute("normal");
      o.geometry = toCreasedNormals(o.geometry, THREE.MathUtils.degToRad(35));
      o.material = finish === "orange-plastic"
        ? new THREE.MeshStandardMaterial({ color: 0xe87516, roughness: 0.32, metalness: 0 })
        : (MATERIALS[o.name] || MATERIALS.stand)();
      o.castShadow = finish === "orange-plastic" || o.name !== "shell";
      o.receiveShadow = finish === "orange-plastic" || o.name !== "shell";
    });
    const box = new THREE.Box3().setFromObject(model);
    table.position.y = box.min.y - 0.05;
    glow.position.y = glowBack.position.y = 0.1;
    scene.add(model);
    onReady?.();
  }, undefined, err => { if (!disposed) onError?.(err); });

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  visibilityObserver.observe(host);
  resize();

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) controls.autoRotate = false;

  renderer.setAnimationLoop(() => {
    if (!visible) return;
    controls.update();
    renderer.render(scene, camera);
  });

  return {
    reset() {
      camera.position.set(-2.6, 1.3, 4.6);
      controls.target.set(0, -0.1, 0);
      controls.autoRotate = !reduced;
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      controls.dispose();
      scene.traverse(o => {
        if (!o.isMesh) return;
        o.geometry.dispose();
        o.material.map?.dispose();
        o.material.dispose();
      });
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
