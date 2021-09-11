import * as THREE from "three";
import * as dat from "dat.gui";
import Mesh from "./Mesh";

export default class Canvas {
  constructor() {
    this.container = document.querySelector("main");
    this.images = [...document.querySelectorAll("img")];
    this.meshItems = [];
    this.scene = new THREE.Scene();
    this.geometry = new THREE.PlaneGeometry(1, 1, 30, 30);

    this.setupCamera();
    this.createMeshItems();
  }

  // Getter function used to get screen dimensions used for the camera and mesh materials
  get viewport() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }

  setupCamera() {
    const perspective = 1000;
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI; // see fov image for a picture breakdown of this fov setting.
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      1,
      1000
    );
    this.camera.position.set(0, 0, perspective); // set the camera position on the z axis.

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height); // uses the getter viewport function above to set size of canvas / renderer
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Import to ensure image textures do not appear blurred.
    this.container.appendChild(this.renderer.domElement); // append the canvas to the main element
  }

  createMeshItems() {
    this.images.forEach((image) => {
      const mesh = new Mesh(image, this.scene, this.geometry);
      this.meshItems.push(mesh);
    });
  }

  onResize() {
    this.camera.aspect = this.viewport.aspectRatio; // readjust the aspect ratio.
    this.camera.updateProjectionMatrix(); // Used to recalulate projectin dimensions.
    this.renderer.setSize(this.viewport.width, this.viewport.height);

    this.meshItems.forEach((mesh) => {
      mesh.onResize();
    });
  }

  update(scroll) {
    this.meshItems.forEach((mesh) => {
      mesh.render(scroll);
    });
    this.renderer.render(this.scene, this.camera);
  }
}
