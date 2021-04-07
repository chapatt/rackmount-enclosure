<template>
  <div id="home">
    <h1>Rackmount Enclosure</h1>
    <router-link to="calculator">Calculator</router-link>
    <demo-3d />
  </div>
</template>

<script>
  import Demo3d from '../components/Demo3d';

  export default {
    name: 'Home',
    components: {
      Demo3d
    },
  }
</script>

<style>
  html {
    font-family: sans-serif;
  }
  .demo-3d {
    height: 30em;
  }
</style>
