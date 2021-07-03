<template>
  <div id="home">
    <h1>Rackmount Enclosure</h1>
    <h2>
      <router-link to="calculator">Drawing Generator - Customize, render, and share your design as a DXF or URL</router-link>
    </h2>
    <demo-3d />
  </div>
</template>

<script>
  import Demo3d from '@/components/Demo3d';

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

  a {
    text-decoration: none;
  }

  .demo-3d {
    width: 100%;
  }

  .demo-3d .viewport {
  }
</style>
