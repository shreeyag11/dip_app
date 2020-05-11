<template>
  <section class="section is-full">
    <ImageViewer></ImageViewer>
    <Log></Log>
    <FilePicker></FilePicker>
  </section>
</template>

<script>
//  TODO: Dhruv [11/5]: Image viewer doesnt disappear after a succeful file is followed by a dumb file
import ImageViewer from "../components/ImageViewer.vue";
import FilePicker from "../components/FilePicker.vue";
import Log from "../components/Log.vue";

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log
  }
};
</script>