<template>
  <section class="section is-full">
    <ImageViewer />
    <Log />
    <FilePicker />
  </section>
</template>

<script>
//  TODO: Dhruv [11/5]: Image viewer doesnt disappear after a succeful file is followed by a dumb file
import ImageViewer from '../components/Viewer/ImageViewer.vue';
import FilePicker from '../components/Viewer/FilePicker.vue';
import Log from '../components/Viewer/Log.vue';

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log,
  },
};
</script>
