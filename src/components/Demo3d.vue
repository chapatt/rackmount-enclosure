<template>
  <div class="demo-3d">
    <div class="viewport" ref="viewport" />
    <table class="objectSelector">
      <thead>
        <tr v-if="screws.length > 0">
          <th>Part</th>
          <th>Visibility</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="screws.objects.length > 0">
          <td>Screws</td>
          <td><input type="checkbox" :checked="screws.visibility" @change="toggleVisibility(screws)" /></td>
        </tr>
        <tr v-if="pems.objects.length > 0">
          <td>PEMs</td>
          <td><input type="checkbox" :checked="pems.visibility" @change="toggleVisibility(pems)" /></td>
        </tr>
        <tr v-for="(objectGroup, i) in namedObjects" :key="`named${i}`">
          <td>{{ objectGroup.objects[0].name }}</td>
          <td><input type="checkbox" :checked="objectGroup.visibility" @change="toggleVisibility(objectGroup)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
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
    data() {
      return {
        screws: {
          objects: [],
          visibility: true,
        },
        pems: {
          objects: [],
          visibility: true,
        },
        namedObjects: [],
      }
    },
    methods: {
      animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      },
      populateObjectSelector(gltf) {
        let pendingLayout = false;
        gltf.scene.traverse(child => {
          if (child instanceof Mesh) {
            if (/Screw/g.exec(child.name)) {
              this.screws.objects.push(child);
            } else if (/Pem/g.exec(child.name)) {
              this.pems.objects.push(child);
            } else {
              this.namedObjects.push({
                objects: [child],
                visibility: true,
              });
            }
          }
          if (!pendingLayout) {
            pendingLayout = true;
            window.requestAnimationFrame(() => {
              pendingLayout = false;
              this.layoutViewport();
            });
          }
        });
      },
      toggleVisibility(objectGroup) {
        objectGroup.visibility = !objectGroup.visibility;
        objectGroup.objects.forEach(object => {
          object.visible = objectGroup.visibility;
        });
      },
      layoutViewport() {
        this.camera.aspect = this.$refs.viewport.offsetWidth / this.$refs.viewport.offsetHeight,
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.$refs.viewport.offsetWidth, this.$refs.viewport.offsetHeight);
      },
    },
    mounted() {
      window.addEventListener('resize', this.layoutViewport.bind(this));

      this.scene = new Scene();

      this.camera = new PerspectiveCamera(
        40,
        this.$refs.viewport.offsetWidth / this.$refs.viewport.offsetHeight,
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
      this.renderer.setSize(this.$refs.viewport.offsetWidth, this.$refs.viewport.offsetHeight);
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

      this.$refs.viewport.appendChild(this.renderer.domElement);
    },
  }
</script>

<style scoped>
  .demo-3d {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .viewport {
    flex-grow: 1;
    background: linear-gradient(#382c7a, #9690b8);
    overflow: hidden;
  }

  .objectSelector {
    flex-shrink: 0;
    width: fit-content;
    overflow-y: scroll;
    display: block;
  }

  .objectSelector td, .objectSelector th {
    padding: 0.2em;
  }
</style>
