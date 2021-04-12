<template>
  <div class="demo-3d">
    <div class="loading-overlay" v-if="loading">
      <p>Loading {{ loadedBytes }}{{ totalBytes ? ` / ${totalBytes}` : '' }} bytes</p>
      <progress-bar v-if="totalBytes" :progress="loadedBytes / totalBytes" />
    </div>
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
            <td>{{ formatObjectName(objectGroup.objects[0].name) }}</td>
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
  import ProgressBar from "@/components/ProgressBar";

  export default {
    name: 'Demo3d',
    components: {
      ProgressBar,
    },
    data() {
      return {
        loading: true,
        error: null,
        loadedBytes: 0,
        totalBytes: 0,
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
      formatObjectName(name) {
        const words = name.match(/([A-Z]+[a-z]*)+?/g);
        return words.reduce((acc, word) => `${acc} ${word.toLowerCase()}`)
      },
      toggleVisibility(objectGroup) {
        objectGroup.visibility = !objectGroup.visibility;
        objectGroup.objects.forEach(object => {
          object.visible = objectGroup.visibility;
        });
      },
      layoutViewport() {
        this.camera.aspect = this.$refs.viewport.offsetWidth / this.$refs.viewport.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.$refs.viewport.offsetWidth, this.$refs.viewport.offsetHeight);
      },
    },
    mounted() {
      this.resizeListener = this.layoutViewport.bind(this);
      window.addEventListener('resize', this.resizeListener);

      this.scene = new Scene();

      this.camera = new PerspectiveCamera(
        40,
        this.$refs.viewport.offsetWidth / this.$refs.viewport.offsetHeight,
        0.001,
        2000
      );
      this.camera.position.set(0.5,0.6,0.8);

      const pointLight = new PointLight(0xffffff, 0.4);
      pointLight.position.set(3, 20, 10);
      this.scene.add(pointLight);

      const ambientLight = new AmbientLight(0xffffff, 1.2);
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
          this.loading = false;
          this.scene.add(gltf.scene);
          this.populateObjectSelector(gltf);
        },
        ({loaded, total}) => {this.loadedBytes = loaded; this.totalBytes = total},
        error => {this.error = error}
      );

      this.animate();

      this.$refs.viewport.appendChild(this.renderer.domElement);
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
</script>

<style scoped>
  .demo-3d {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 30em;
    position: relative;
  }

  .loading-overlay {
    background-color: #eeeeee;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .progress-bar {
    width: 50%;
    height: 1em;
    border-style: solid;
    border-width: 0.1em;
  }

  /deep/ .progress-bar .bar {
    background-color: black;
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

  .objectSelector th {
    border-bottom-style: solid;
    border-bottom-width: 0.1em;
    border-bottom-color: #cccccc;
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
