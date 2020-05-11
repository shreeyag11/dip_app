<template>
  <div class="container">
    <section>
      <b-field>
        <b-upload v-model="dropFile" drag-drop @input="parse">
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p v-if="dropFile" class="is-size-4">Successfully read {{ dropFile.name }}</p>
              <p v-else class="is-size-4">Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropFile: undefined
    };
  },

  methods: {
    parse: function() {
      const reader = new FileReader();
      reader.readAsText(this.dropFile);

      reader.onerror = error => console.log(error);
      reader.onload = event => {
        let text = event.target.result.trim();
        try {
          let header = this.lib.parse_header_json(text);
          console.log(header);
          header.pixels = new Uint8ClampedArray(
            this.lib.parse_pixels_json(text)
          );
          console.log(header);

          header.name = this.dropFile.name;

          this.$store.commit("ADD_FILE", header);
        } catch (errors) {
          this.$store.commit("ADD_FILE_PARSE_ERRORS", errors);
        }
      };
    }
  }
};
</script>

<style scoped>
.upload {
  width: 100%;
  display: block;
}
</style>