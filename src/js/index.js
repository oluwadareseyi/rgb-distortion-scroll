import Canvas from "./app/Canvas";
import Scroll from "./app/smoothScroll";
import { lerp } from "./utils";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader();

// /**
//  * Test mesh
//  */
// // Geometry
// const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);

// // Material
// const material = new THREE.MeshBasicMaterial();

// // Mesh
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.set(0.25, -0.25, 1);
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();
const smoothScroll = new Scroll();
const canvas = new Canvas();

window.addEventListener("resize", () => {
  smoothScroll.init();
  canvas.onResize();
});

const scroll = {
  current: 0,
  target: 0,
  ease: 0.075,
};

const render = () => {
  // const elapsedTime = clock.getElapsedTime();

  // // Update controls
  // controls.update();

  // update scroll
  scroll.target = window.scrollY;

  scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

  // update snmooth scroll
  smoothScroll.update(scroll);

  // update canvas
  canvas.update(scroll);

  // Render
  // renderer.render(scene, camera);

  // Call render again on the next frame
  window.requestAnimationFrame(render);
};

render();
