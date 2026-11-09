import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { toCreasedNormals } from "three/addons/utils/BufferGeometryUtils.js";
import { createRenderLoop, disposeMaterials, disposeObject } from "./viewer-utils.js";
import { createStudio } from "./viewer-studio.js";

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

export function createModelViewer(host, { src, finish, onReady, onError }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  host.appendChild(renderer.domElement);

  const studio = createStudio(renderer);
  const { scene, table } = studio;
  renderer.shadowMap.autoUpdate = false;

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

  const glow = new THREE.PointLight(0xffa850, 3.2, 5, 1.6);
  glow.position.set(0, 0.1, 0.9);
  const glowBack = glow.clone();
  glowBack.position.z = -0.9;
  if (finish !== "orange-plastic" && finish !== "ikuyo") scene.add(glow, glowBack);

  let disposed = false;
  const loop = createRenderLoop(host, delta => {
    const moving = controls.update(delta);
    renderer.render(scene, camera);
    return controls.autoRotate || moving;
  });
  controls.addEventListener("change", loop.requestRender);

  new GLTFLoader().load(src, gltf => {
    if (disposed) {
      disposeObject(gltf.scene);
      return;
    }
    const model = gltf.scene;
    const ikuyoMaterials = finish === "ikuyo" ? {
      rubber: new THREE.MeshStandardMaterial({ color: 0xb45e20, roughness: 0.48 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xc3c6c5, metalness: 0.85, roughness: 0.28 }),
      plastic: new THREE.MeshStandardMaterial({
        color: 0xc8d0d0, roughness: 0.25, transparent: true, opacity: 0.3, depthWrite: false
      }),
      glass: new THREE.MeshStandardMaterial({
        color: 0xe1e7e6, metalness: 0.1, roughness: 0.12, transparent: true, opacity: 0.22, depthWrite: false
      })
    } : null;
    const replacedMaterials = new Set();
    const replacedGeometries = new Set();
    model.traverse(o => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(material => replacedMaterials.add(material));
      if (ikuyoMaterials) {
        o.material = o.material.name === "matterubber" ? ikuyoMaterials.rubber
          : o.material.name === "translucentplastic" ? ikuyoMaterials.plastic
          : o.material.name === "clearglass" ? ikuyoMaterials.glass
          : ikuyoMaterials.steel;
        o.castShadow = !o.material.transparent;
        o.receiveShadow = !o.material.transparent;
        return;
      }
      replacedGeometries.add(o.geometry);
      o.geometry.deleteAttribute("normal");
      o.geometry = toCreasedNormals(o.geometry, THREE.MathUtils.degToRad(35));
      o.material = finish === "orange-plastic"
        ? new THREE.MeshStandardMaterial({ color: 0xe87516, roughness: 0.32, metalness: 0 })
        : (MATERIALS[o.name] || MATERIALS.stand)();
      o.castShadow = finish === "orange-plastic" || o.name !== "shell";
      o.receiveShadow = finish === "orange-plastic" || o.name !== "shell";
    });
    replacedGeometries.forEach(geometry => geometry.dispose());
    disposeMaterials(replacedMaterials);
    let displayModel = model;
    if (ikuyoMaterials) {
      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const scale = 2.4 / Math.max(size.x, size.y, size.z);
      displayModel = new THREE.Group();
      displayModel.add(model);
      displayModel.scale.setScalar(scale);
      displayModel.position.copy(center).multiplyScalar(-scale);
    }
    const box = new THREE.Box3().setFromObject(displayModel);
    table.position.y = box.min.y - 0.05;
    glow.position.y = glowBack.position.y = 0.1;
    scene.add(displayModel);
    renderer.shadowMap.needsUpdate = true;
    loop.requestRender();
    onReady?.();
  }, undefined, err => { if (!disposed) onError?.(err); });

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    loop.requestRender();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) controls.autoRotate = false;

  return {
    reset() {
      camera.position.set(-2.6, 1.3, 4.6);
      controls.target.set(0, -0.1, 0);
      controls.autoRotate = !reduced;
      loop.requestRender();
    },
    dispose() {
      disposed = true;
      loop.dispose();
      resizeObserver.disconnect();
      controls.dispose();
      disposeObject(scene);
      studio.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
