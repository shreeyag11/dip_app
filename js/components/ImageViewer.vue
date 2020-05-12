<template>
  <div class="viewerDiv has-text-centered">
    <div id="viewerDiv" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({}),
  mounted() {
    if (this.$store.state.file && this.$store.state.fileParseSuccessful) {
      this.fileChanged(this.$store.state.file);
    }
  },
  computed: {
    ...mapState(['fileParseSuccessful', 'file']),
  },
  watch: {
    file(newVal) {
      if (this.$router.currentRoute.name == 'Viewer') {
        this.fileChanged(newVal);
      }
    },
  },
  methods: {
    fileChanged(newVal) {
      console.log('trying to render');
      const viewerDiv = document.getElementById('viewerDiv');

      while (viewerDiv.lastElementChild) {
        viewerDiv.removeChild(viewerDiv.lastElementChild);
      }

      const canvas = document.createElement('canvas');
      canvas.width = newVal.width;
      canvas.height = newVal.height;
      const ctx = canvas.getContext('2d');

      ctx.putImageData(
        new ImageData(newVal.pixels, newVal.width, newVal.height),
        0,
        0,
      );

      viewerDiv.appendChild(canvas);
    },
  },
};
</script>

<style scoped>
.viewerDiv {
  padding-top: 2rem;
  justify-content: center;
}
</style>