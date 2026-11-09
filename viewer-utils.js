export function createRenderLoop(host, render) {
  let visible = false;
  let disposed = false;
  let frameId = null;
  let lastTime = null;

  function requestRender() {
    if (!disposed && visible && !document.hidden && frameId === null) {
      frameId = requestAnimationFrame(tick);
    }
  }

  function tick(time) {
    frameId = null;
    if (disposed || !visible || document.hidden) return;
    const delta = lastTime === null ? 1 / 60 : Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    if (render(delta)) requestRender();
    else if (frameId === null) lastTime = null;
  }

  function updateVisibility() {
    if (visible && !document.hidden) {
      requestRender();
    } else {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      lastTime = null;
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateVisibility();
  });
  observer.observe(host);
  document.addEventListener("visibilitychange", updateVisibility);

  return {
    requestRender,
    dispose() {
      disposed = true;
      if (frameId !== null) cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    }
  };
}

export function disposeMaterials(materials) {
  const textures = new Set();
  materials.forEach(material => {
    Object.values(material).forEach(value => {
      if (value?.isTexture) textures.add(value);
    });
    material.dispose();
  });
  textures.forEach(texture => texture.dispose());
}

export function disposeObject(object) {
  const geometries = new Set();
  const materials = new Set();
  object.traverse(child => {
    if (!child.isMesh) return;
    geometries.add(child.geometry);
    (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => materials.add(material));
  });
  geometries.forEach(geometry => geometry.dispose());
  disposeMaterials(materials);
}
