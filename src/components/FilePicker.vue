<template>
  <div class="container">
    <section>
      <b-field>
        <b-upload v-model="dropFile" drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </section>
    <button
      v-if="dropFile"
      class="button is-info is-fullwidth"
      @click="parse"
    >Load {{ dropFile.name }}</button>
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