<template>
  <div class="viewerDiv has-text-centered">
    <div id="viewerDiv" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    canvas: undefined,
    viewerDiv: undefined,
  }),
  mounted() {
    this.viewerDiv = document.getElementById('viewerDiv');
    this.canvas = document.createElement('canvas');
  },
  computed: {
    ctx() {
      return this.canvas.getContext('2d');
    },
    ...mapState(['fileParseSuccessful', 'file']),
  },
  watch: {
    file(newVal) {
      while (this.viewerDiv.lastElementChild) {
        this.viewerDiv.removeChild(this.viewerDiv.lastElementChild);
      }

      this.canvas.width = newVal.width;
      this.canvas.height = newVal.height;

      this.ctx.putImageData(
        new ImageData(newVal.pixels, newVal.width, newVal.height),
        0,
        0,
      );

      this.viewerDiv.appendChild(this.canvas);
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