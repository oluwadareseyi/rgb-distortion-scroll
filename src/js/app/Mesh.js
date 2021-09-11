import * as THREE from "three";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

export default class Mesh {
  constructor(element, scene, geometry) {
    this.element = element;
    this.scene = scene;
    this.geometry = geometry;
    this.offset = new THREE.Vector2(0, 0);
    this.sizes = new THREE.Vector2(0, 0);

    this.createMesh();
  }

  getDimensions() {
    const { width, height, top, left } = this.element.getBoundingClientRect();
    this.sizes.set(width, height);
    this.offset.x = left - window.innerWidth / 2 + width / 2;
    this.offset.y = -top + window.innerHeight / 2 - height / 2;
  }

  createMesh() {
    this.imageTexture = new THREE.TextureLoader().load(this.element.src);
    this.uniforms = {
      uTexture: { value: this.imageTexture },
      uOffset: { value: new THREE.Vector2(0, 0) },
      uAlpha: { value: 1.0 },
    };

    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: this.uniforms,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.getDimensions();

    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
    this.scene.add(this.mesh);
  }

  onResize() {
    this.getDimensions();

    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
  }

  render(scroll) {
    const { current, target } = scroll;
    this.getDimensions();

    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.uniforms.uOffset.value.set(0, -(target - current) * 0.0003);
  }
}
