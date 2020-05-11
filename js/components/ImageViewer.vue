<template>
  <div class="viewerDiv has-text-centered">
    <div id="viewerDiv"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      image: undefined
    };
  },
  computed: {
    ...mapState(["fileParseSuccessful", "file"])
  },
  watch: {
    file: function(newVal, oldVal) {
      const canvas = document.createElement('canvas');
      canvas.width = newVal.width;
      canvas.height = newVal.height;

      const ctx = canvas.getContext('2d');
      ctx.putImageData(new ImageData(newVal.pixels, newVal.width, newVal.height), 0, 0);
      this.image = {
        dataURL: canvas.toDataURL(),
        width: newVal.width,
        height: newVal.height
      };
    },
    image: function(img, oldImg) {
      let viewerDiv = document.getElementById("viewerDiv");

      while (viewerDiv.lastElementChild) {
        viewerDiv.removeChild(viewerDiv.lastElementChild);
      }

      let app = new this.PIXI.Application({
        width: img.width,
        height: img.height,
        backgroundColor: 0xaaaaaa
      });

      viewerDiv.appendChild(app.view);

      let IMG = this.PIXI.Sprite.from(img.dataURL);
      IMG.anchor.set(0.5);

      IMG.x = app.screen.width / 2;
      IMG.y = app.screen.height / 2;

      app.stage.addChild(IMG);
    }
  }
};
</script>

<style scoped>
.viewerDiv {
  padding-top: 2rem;
  justify-content: center;
}
</style>