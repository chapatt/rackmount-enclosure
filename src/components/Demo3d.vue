<template>
  <div class="demo-3d" ref="container" />
</template>

<script>
  import {
    AmbientLight,
    HemisphereLight,
    Mesh,
    PerspectiveCamera,
    PointLight,
    Scene,
    Vector3,
    WebGLRenderer
  } from 'three';
  import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

  export default {
    name: 'Demo3d',
    methods: {
      animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      },
      populateObjectSelector(gltf) {
        gltf.scene.traverse(child => {
          console.log('got a child!');
          if (child instanceof Mesh) {
            console.log(`${child.name} was a Mesh!`);
          }
        });
      },
    },
    mounted() {
      this.scene = new Scene();

      this.camera = new PerspectiveCamera(
        40,
        this.$refs.container.offsetWidth / this.$refs.container.offsetHeight,
        0.001,
        2000
      );
      this.camera.position.set(0.5,0.6,0.8);

      this.light = new HemisphereLight(0xffffff, 0x080808, 1);
      this.scene.add(this.light);

      const pointLight = new PointLight(0xffffff, 0.4);
      pointLight.position.set(10, 10, 10);
      this.scene.add(pointLight);

      const ambientLight = new AmbientLight(0xbbbbbb);
      this.scene.add(ambientLight);

      this.renderer = new WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(this.$refs.container.offsetWidth, this.$refs.container.offsetHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target = new Vector3(0, 0, 0);
      this.controls.update();

      const loader = new GLTFLoader();
      loader.load(
        'enclosure.glb',
        gltf => {
          this.scene.add(gltf.scene);
          this.populateObjectSelector(gltf);
        },
        undefined,
        error => console.error(error),
      );

      this.animate();

      this.$refs.container.appendChild(this.renderer.domElement);
    },
  }
</script>
