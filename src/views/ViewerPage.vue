<template>
  <section class="section is-full">
    <ImageViewer></ImageViewer>
    <Log></Log>
    <FilePicker></FilePicker>
  </section>
</template>

<script>
//  TODO: Image viewer doesnt disappear after a succeful file is followed by a dumb file
import ImageViewer from "/src/components/ImageViewer.vue";
import FilePicker from "/src/components/FilePicker.vue";
import Log from "/src/components/Log.vue";

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log
  }
};
</script>