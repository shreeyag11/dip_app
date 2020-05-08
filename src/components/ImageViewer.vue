<template>
  <div class="container viewerDiv has-text-centered">
    <div id="viewerDiv">
    </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    let app = new this.PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0xaaaaaa
    });

    document.getElementById("viewerDiv").appendChild(app.view);

    app.loader.baseUrl = "img";
    app.loader.add("cci_logo", "cci_logo.png");
    app.loader.onError.add((e) => {
        console.log(e.message);
    });
    app.loader.load(() => {
        console.log("loaded")
    });
  }
};
</script>

<style scoped>
.viewerDiv {
  padding-top: 2rem;
  justify-content: center;
}
</style>