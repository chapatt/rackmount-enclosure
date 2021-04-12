<template>
  <div class="progress-bar">
    <div
      class="bar"
      :style="`width: ${progress * 100}%`"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    props: {
      progress: {
        required: true,
        type: Number,
        validator: value => value >= 0 && value <= 1,
      },
    },
  }
</script>

<style scoped>
  .bar {
    height: 100%;
  }
</style>
