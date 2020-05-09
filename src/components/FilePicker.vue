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
              <p v-if="dropFile" class="is-size-4">
                Successfully read {{ dropFile.name }}
              </p>
              <p v-else class="is-size-4">
                Drop your files here or click to upload
              </p>
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
          this.$store.commit("ADD_FILE", this.lib.parse(text));
          console.log(this.lib.parse(text));
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