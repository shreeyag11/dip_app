<template>
  <div class="container">
    <article
      id="logContainer"
      :class="logMessageClass"
    >
      <div
        id="hint"
        class="message-header"
      >
        <p>Log</p>
      </div>
      <div
        id="errorLog"
        class="message-body"
      >
        <p v-for="msg in logMessage">
          {{ msg }}
        </p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  computed: {
    fileParseErrors() {
      let errors;
      if (this.$store.state.fileParseErrors) {
        if (this.$store.state.fileParseErrors.split) {
          errors = this.$store.state.fileParseErrors.split('#!@');
        } else {
          errors = [this.$store.state.fileParseErrors];
        }

        if (errors.length >= 15) {
          errors = errors.slice(0, 15);
          errors.push('😭 And I stopped counting after the first 15 errors');
        }

        return errors;
      } return undefined;
    },
    logMessageClass() {
      if (this.$store.state.fileParseSuccessful) return 'message is-primary';
      if (this.fileParseErrors) return 'message is-danger';
      return 'message is-warning';
    },
    logMessage() {
      if (this.$store.state.fileParseSuccessful) {
        return [
          'File parsed successfully.',
          `The parsed file type is ${this.$store.state.file.file_type}`,
          `The parsed height is ${this.$store.state.file.height}`,
          `The parsed width is ${this.$store.state.file.width}`,
        ];
      } if (this.$store.state.fileParseErrors) {
        return this.fileParseErrors;
      }
      return undefined;
    },
  },
};
</script>