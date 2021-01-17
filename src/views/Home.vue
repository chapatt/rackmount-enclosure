<template>
  <div id="home">
    <h1>Rackmount Enclosure</h1>
    <router-link to="calculator">Calculator</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
      };
    },
    computed: {
      aComputedProp() {
        return null;
      },
    },
    methods: {
      aMethod() {
      },
    },
    created() {
    },
  }
</script>

<style>
  html {
    font-family: sans-serif;
  }
  input, fieldset, label, button, select {
    margin: 0.5em 0;
  }
  fieldset, .dxf-view {
    border-width: 2px;
    border-color: darkgray;
    border-style: solid;
  }
  label.not-implemented {
    color: #888;
  }
  input, button {
    margin-right: 1em;
  }
  button, .dxf-view {
    margin-bottom: 1em;
  }
  .dxf-view {
    height: 30em;
    padding: 1em;
  }
</style>
