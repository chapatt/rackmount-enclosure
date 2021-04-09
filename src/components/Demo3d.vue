<template>
  <div class="demo-3d">
    <div class="viewport" ref="viewport" />
    <div class="objectSelector">
      <table>
        <thead>
          <tr>
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
  </div>
</template>

<script>
  import {
    AmbientLight,
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

      const pointLight = new PointLight(0xffffff, 0.4);
      pointLight.position.set(10, 10, 10);
      this.scene.add(pointLight);

      const ambientLight = new AmbientLight(0xffffff, 1);
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
    height: 30em;
  }

  .viewport {
    flex-grow: 1;
    background: linear-gradient(#333365, #9797aa);
    overflow: hidden;
  }

  .objectSelector {
    flex-shrink: 0;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 1em;
    background-color: #eeeeee;
  }

  .objectSelector table {
    width: fit-content;
    display: block;
  }

  .objectSelector td, .objectSelector th {
    padding: 0.2em;
  }

  .objectSelector td:nth-child(2) {
    text-align: center;
  }

  @media (orientation: portrait) {
    .demo-3d {
      flex-direction: column;
      height: auto;
    }

    .viewport {
      height: 30em;
    }

    .objectSelector {
      flex-grow: 1;
    }

    .objectSelector table {
      display: table;
      width: 100%;
    }
  }
</style>
