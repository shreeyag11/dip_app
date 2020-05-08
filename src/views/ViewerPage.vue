<template>
  <section class="section is-full">
    <FilePicker></FilePicker>
    <Log></Log>
    <ImageViewer></ImageViewer>
  </section>
</template>

<script>
import ImageViewer from '/src/components/ImageViewer.vue';
import FilePicker from '/src/components/FilePicker.vue';
import Log from '/src/components/Log.vue';

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log
  }
}
</script>