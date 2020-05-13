<template>
  <section class="section is-full">
    <ImageViewer />
    <Log />
    <FilePicker />
  </section>
</template>

<script>
import ImageViewer from '../components/Ass1/Renderer.vue';
import FilePicker from '../components/Ass1/FilePicker.vue';
import Log from '../components/Ass1/Log.vue';

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log,
  },
};
</script>

<style scoped>
</style>