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
            this.$store.dispatch("PARSE_FILE", this.dropFile);
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