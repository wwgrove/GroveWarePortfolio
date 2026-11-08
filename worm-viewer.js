import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const JOINTS = {
  "ManHead-2": [0.0553, 0.0782, 0.0325],
  "ManChest-1": [0.0262, 0.0818, 0.0399],
  "ManBooty-1": [0.0003, 0.0822, 0.0325],
  "ManThigh-1": [-0.0293, 0.0906, 0.0399],
  "ManLeg-1": [-0.0293, 0.0906, 0.0325],
  "ManBicep-1": [0.0463, 0.0773, 0.0251],
  "ManForearm-1": [0.0291, 0.0616, 0.029]
};

const JOINT_HARDWARE = {
  "ManHead-2": ["BodyConnector-1", "Spacer-1"],
  "ManChest-1": ["BodyConnector-2", "Spacer-2"],
  "ManBooty-1": ["BodyConnector-3", "Spacer-3"],
  "ManThigh-1": ["BodyConnector-4", "Spacer-4"],
  "ManBicep-1": ["ShoulderConnector-1", "Spacer-5", "Spacer-6"],
  "ManForearm-1": ["ElbowConnector-2"]
};

const GEAR_SPEED = {
  rightLarge: 1,
  rightSmall: -1.28,
  centerRightLarge: 0.98,
  centerSmall: -1.31,
  centerLeftLarge: 0.99,
  leftSmall: -1.09,
  leftLarge: 0.98
};

const WIRE_CONNECTIONS = [
  {
    name: "ManWire-1",
    topAnchor: [0.0684, 0.0792, 0.031],
    topPivot: "ManHead-2",
    camCenter: [0.0533, 0.0135, 0.0333],
    camPin: [0.0525, 0.0037, 0.0333],
    camSpeed: GEAR_SPEED.rightSmall
  },
  {
    name: "ManWire-2",
    topAnchor: [0.0106, 0.0838, 0.031],
    topPivot: "ManBooty-1",
    camCenter: [-0.0001, 0.0135, 0.0333],
    camPin: [-0.0086, 0.0091, 0.0333],
    camSpeed: GEAR_SPEED.centerSmall
  },
  {
    name: "ManWire-3",
    topAnchor: [-0.058, 0.1012, 0.031],
    topPivot: "ManLeg-1",
    camCenter: [-0.0534, 0.0135, 0.0333],
    camPin: [-0.055, 0.024, 0.0333],
    camSpeed: GEAR_SPEED.leftSmall
  }
];

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const ROTATING_PARTS = {
  "Crank-1": { speed: 1, axis: X_AXIS },
  "CircleCam-2": { speed: 1, axis: X_AXIS },
  "Bevel-Base-Revolve-4": { speed: 1, axis: X_AXIS },
  "Bevel-Base-Revolve-2": { speed: GEAR_SPEED.rightLarge, axis: Z_AXIS },
  "spur_gear_ai-4": { speed: GEAR_SPEED.rightLarge, axis: Z_AXIS },
  "spur_gear_ai-7": { speed: GEAR_SPEED.rightSmall, axis: Z_AXIS },
  "spur_gear_ai-1": { speed: GEAR_SPEED.centerRightLarge, axis: Z_AXIS },
  "spur_gear_ai-6": { speed: GEAR_SPEED.centerSmall, axis: Z_AXIS },
  "spur_gear_ai-3": { speed: GEAR_SPEED.centerLeftLarge, axis: Z_AXIS },
  "spur_gear_ai-2": { speed: GEAR_SPEED.leftSmall, axis: Z_AXIS },
  "spur_gear_ai-5": { speed: GEAR_SPEED.leftLarge, axis: Z_AXIS },
  "CircleCam-1": { speed: GEAR_SPEED.rightSmall, axis: Z_AXIS },
  "CircleCam-4": { speed: GEAR_SPEED.centerSmall, axis: Z_AXIS },
  "RearLegsCircleCam-1": { speed: GEAR_SPEED.leftSmall, axis: Z_AXIS },
  "Bevel-Base-Revolve-1": { speed: GEAR_SPEED.leftLarge, axis: Z_AXIS },
  "Bevel-Base-Revolve-3": { speed: -GEAR_SPEED.leftLarge, axis: Y_AXIS },
  "CircleCam-5": { speed: -GEAR_SPEED.leftLarge, axis: Y_AXIS }
};

function linkedAngle(start, end, startLift, endLift) {
  const restingAngle = Math.atan2(end[1] - start[1], end[0] - start[0]);
  const liftedAngle = Math.atan2(end[1] + endLift - (start[1] + startLift), end[0] - start[0]);
  return liftedAngle - restingAngle;
}

function solvePlantedArm(shoulder) {
  const hand = new THREE.Vector2(0.0291, 0.0616);
  const restingElbow = new THREE.Vector2(0.0337, 0.0814);
  const upperLength = new THREE.Vector2(0.0463, 0.0773).distanceTo(restingElbow);
  const forearmLength = hand.distanceTo(restingElbow);
  const shoulderToHand = hand.clone().sub(shoulder);
  const distance = THREE.MathUtils.clamp(
    shoulderToHand.length(),
    Math.abs(upperLength - forearmLength) + 0.00001,
    upperLength + forearmLength - 0.00001
  );
  const direction = shoulderToHand.normalize();
  const along = (upperLength ** 2 - forearmLength ** 2 + distance ** 2) / (2 * distance);
  const height = Math.sqrt(Math.max(0, upperLength ** 2 - along ** 2));
  const center = shoulder.clone().addScaledVector(direction, along);
  const elbow = center.add(new THREE.Vector2(direction.y, -direction.x).multiplyScalar(height));
  const upperRest = Math.atan2(0.0814 - 0.0773, 0.0337 - 0.0463);
  const forearmRest = Math.atan2(0.0814 - 0.0616, 0.0337 - 0.0291);

  return {
    upperAngle: Math.atan2(elbow.y - shoulder.y, elbow.x - shoulder.x) - upperRest,
    forearmAngle: Math.atan2(elbow.y - hand.y, elbow.x - hand.x) - forearmRest
  };
}

function rotateAroundCam(pin, center, angle) {
  const x = pin.x - center.x;
  const y = pin.y - center.y;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return new THREE.Vector3(
    center.x + x * cosine - y * sine,
    center.y + x * sine + y * cosine,
    pin.z
  );
}

function camPinLift(pin, center, angle) {
  return rotateAroundCam(new THREE.Vector3(...pin), new THREE.Vector3(...center), angle).y - pin[1];
}

function moveWireBetween(wire, bottom, top) {
  const direction = top.clone().sub(bottom);
  const length = direction.length();
  wire.position.copy(bottom).add(top).multiplyScalar(0.5);
  wire.quaternion.setFromUnitVectors(Y_AXIS, direction.normalize());
  wire.scale.set(1, length, 1);
}

function transformPointAroundPivot(point, pivot, angle, verticalLift) {
  return point
    .sub(pivot)
    .rotateAround(new THREE.Vector2(), angle)
    .add(pivot)
    .add(new THREE.Vector2(0, verticalLift));
}

function materialForPart(name) {
  let color = "#b8b7b2";
  let metalness = 0.08;
  let roughness = 0.7;

  if (name.startsWith("Man") && !name.startsWith("ManWire")) color = "#c9866d";
  if (name.startsWith("ManWire") || name.includes("Connector")) color = "#666762";
  if (name === "Box-1" || name === "Comb-1") color = "#aaa9a4";
  if (["gear", "Cam", "Shaft", "Crank", "Collar"].some(part => name.includes(part))) {
    color = "#7d7f7a";
    metalness = 0.32;
    roughness = 0.52;
  }
  if (name === "discoball-1") {
    color = "#dededb";
    metalness = 0.72;
    roughness = 0.25;
  }

  return new THREE.MeshStandardMaterial({ color, metalness, roughness, side: THREE.DoubleSide });
}

export function createWormViewer(host, { src, onReady, onError }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#ebeae6");
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 10);
  camera.position.set(0.5, 0.3, -0.8);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.minDistance = 0.28;
  controls.maxDistance = 1.2;
  controls.target.set(0, 0.045, 0.025);

  scene.add(new THREE.HemisphereLight("#ffffff", "#77736d", 1.8));
  const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
  keyLight.position.set(0.4, 0.55, -0.45);
  keyLight.castShadow = true;
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight("#ffffff", 0.8);
  fillLight.position.set(-0.3, 0.2, 0.3);
  scene.add(fillLight);

  let disposed = false;
  let playing = true;
  let speed = 1;
  let phase = 0;
  let model = null;
  let wireMaterial = null;
  let frameId;
  let resizeObserver;
  let visibilityObserver;
  let visible = true;
  const parts = new Map();
  const pivots = new Map();
  const wires = [];
  let discoPivot = null;
  const rotation = new THREE.Quaternion();
  const smoothLift = { front: 0, middle: 0, rear: 0 };
  const clock = new THREE.Clock();

  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    frameId = requestAnimationFrame(animate);
    if (disposed || !visible) return;
    const delta = Math.min(clock.getDelta(), 0.05);
    if (playing) phase += delta * speed * 1.45;
    const t = phase;
    const frontTarget = camPinLift(WIRE_CONNECTIONS[0].camPin, WIRE_CONNECTIONS[0].camCenter, t * WIRE_CONNECTIONS[0].camSpeed);
    const middleTarget = camPinLift(WIRE_CONNECTIONS[1].camPin, WIRE_CONNECTIONS[1].camCenter, t * WIRE_CONNECTIONS[1].camSpeed);
    const rearTarget = camPinLift(WIRE_CONNECTIONS[2].camPin, WIRE_CONNECTIONS[2].camCenter, t * WIRE_CONNECTIONS[2].camSpeed);
    if (playing) {
      smoothLift.front = THREE.MathUtils.damp(smoothLift.front, frontTarget, 11, delta);
      smoothLift.middle = THREE.MathUtils.damp(smoothLift.middle, middleTarget, 11, delta);
      smoothLift.rear = THREE.MathUtils.damp(smoothLift.rear, rearTarget, 11, delta);
    }

    const { front, middle, rear } = smoothLift;
    const chestLift = (middle + front) * 0.5;
    const chestAngle = linkedAngle([0.0262, 0.0818], [0.0553, 0.0782], chestLift, front);
    const shoulder = transformPointAroundPivot(
      new THREE.Vector2(0.0463, 0.0773),
      new THREE.Vector2(0.0262, 0.0818),
      chestAngle,
      chestLift
    );
    const arm = solvePlantedArm(shoulder);

    parts.forEach(part => {
      part.object.position.copy(part.position);
      rotation.setFromAxisAngle(part.axis, t * part.speed);
      part.object.quaternion.copy(part.quaternion).premultiply(rotation);
    });
    if (discoPivot) discoPivot.group.rotation.set(0, -t * GEAR_SPEED.leftLarge, 0);

    const bodyMotion = {
      "ManLeg-1": { lift: rear, angle: 0 },
      "ManThigh-1": { lift: rear, angle: linkedAngle([-0.0293, 0.0906], [0.0003, 0.0822], rear, middle) },
      "ManBooty-1": { lift: middle, angle: linkedAngle([0.0003, 0.0822], [0.0262, 0.0818], middle, (middle + front) * 0.5) },
      "ManChest-1": { lift: chestLift, angle: chestAngle },
      "ManHead-2": { lift: front, angle: 0 },
      "ManBicep-1": { lift: 0, angle: arm.upperAngle, position: shoulder },
      "ManForearm-1": { lift: 0, angle: arm.forearmAngle }
    };

    pivots.forEach((pivot, name) => {
      const motion = bodyMotion[name];
      if (!motion) return;
      pivot.group.position.copy(pivot.position);
      if (motion.position) {
        pivot.group.position.x = motion.position.x;
        pivot.group.position.y = motion.position.y;
      } else {
        pivot.group.position.y += motion.lift;
      }
      pivot.group.rotation.set(0, 0, motion.angle);
    });

    wires.forEach(wire => {
      const pivot = pivots.get(wire.topPivot);
      if (!pivot) return;
      const top = wire.topAnchor.clone().sub(pivot.position);
      top.applyAxisAngle(Z_AXIS, pivot.group.rotation.z).add(pivot.group.position);
      const bottom = rotateAroundCam(wire.camPin, wire.camCenter, t * wire.camSpeed);
      moveWireBetween(wire.mesh, bottom, top);
    });

    controls.update();
    renderer.render(scene, camera);
  }

  new GLTFLoader().load(src, gltf => {
    if (disposed) return;
    model = gltf.scene.clone(true);
    model.position.set(0, -0.045, 0);
    model.rotation.y = -0.12;
    model.updateMatrixWorld(true);
    let assembly;
    const replacedMaterials = new Set();

    model.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => {
          replacedMaterials.add(material);
        });
        object.material = materialForPart(object.name);
      }
      const motion = ROTATING_PARTS[object.name];
      if (motion) {
        parts.set(object.name, {
          object,
          position: object.position.clone(),
          quaternion: object.quaternion.clone(),
          axis: motion.axis,
          speed: motion.speed
        });
      }
    });
    replacedMaterials.forEach(material => {
      material.map?.dispose();
      material.dispose();
    });

    assembly = model.getObjectByName("Assem1");
    if (assembly) {
      Object.entries(JOINTS).forEach(([name, point]) => {
        const object = model.getObjectByName(name);
        if (!object) return;
        const group = new THREE.Group();
        group.name = `${name}-motion-pivot`;
        group.position.fromArray(point);
        assembly.add(group);
        group.attach(object);
        JOINT_HARDWARE[name]?.forEach(hardwareName => {
          const hardware = model.getObjectByName(hardwareName);
          if (hardware) group.attach(hardware);
        });
        pivots.set(name, { group, position: group.position.clone() });
      });

      wireMaterial = new THREE.MeshStandardMaterial({ color: "#4e504c", metalness: 0.38, roughness: 0.48 });
      WIRE_CONNECTIONS.forEach(connection => {
        const originalWire = model.getObjectByName(connection.name);
        if (originalWire) originalWire.visible = false;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.00075, 0.00075, 1, 10), wireMaterial);
        mesh.name = `${connection.name}-constrained`;
        mesh.castShadow = true;
        assembly.add(mesh);
        wires.push({
          mesh,
          topAnchor: new THREE.Vector3(...connection.topAnchor),
          topPivot: connection.topPivot,
          camCenter: new THREE.Vector3(...connection.camCenter),
          camPin: new THREE.Vector3(...connection.camPin),
          camSpeed: connection.camSpeed
        });
      });

      const ball = model.getObjectByName("discoball-1");
      if (ball) {
        const center = new THREE.Box3().setFromObject(ball).getCenter(new THREE.Vector3());
        assembly.worldToLocal(center);
        const group = new THREE.Group();
        group.name = "discoball-drive-pivot";
        group.position.copy(center);
        assembly.add(group);
        group.attach(ball);
        discoPivot = { group, ball };
      }
    }

    scene.add(model);
    resize();
    onReady?.();
  }, undefined, error => {
    if (!disposed) onError?.(error);
  });

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  visibilityObserver.observe(host);
  resize();
  animate();

  return {
    setPlaying(value) { playing = value; },
    setSpeed(value) { speed = value; },
    reset() {
      camera.position.set(0.5, 0.3, -0.8);
      controls.target.set(0, 0.045, 0.025);
      controls.update();
    },
    requestFullscreen() { host.requestFullscreen?.(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      controls.dispose();
      scene.traverse(object => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
        else object.material.dispose();
      });
      wireMaterial?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      parts.clear();
      pivots.clear();
      wires.length = 0;
      model = null;
    }
  };
}
