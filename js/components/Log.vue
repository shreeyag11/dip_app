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
        <div v-if="$store.state[pageName].fileParseSuccessful">
          <p
            v-for="msg in logMessage"
            :key="msg"
          >
            {{ msg }}
          </p>
        </div>
        <pre v-else>{{ logMessage }}</pre>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['pageName'],
  computed: {
    fileParseErrors() {
      let errors;
      if (this.$store.state[this.pageName].fileParseErrors) {
        if (this.$store.state[this.pageName].fileParseErrors.split) {
          errors = this.$store.state[this.pageName].fileParseErrors.split(
            '#!@',
          );
        } else {
          errors = [this.$store.state[this.pageName].fileParseErrors];
        }

        if (errors.length >= 15) {
          errors = errors.slice(0, 15);
          errors.push('😭 And I stopped counting after the first 15 errors');
        }

        return errors.join('\n');
      }
      return undefined;
    },
    logMessageClass() {
      if (this.$store.state[this.pageName].fileParseSuccessful) return 'message is-primary';
      if (this.fileParseErrors) return 'message is-danger';
      return 'message is-warning';
    },
    logMessage() {
      if (this.$store.state[this.pageName].fileParseSuccessful) {
        if (this.pageName === 'viewer') {
          return [
            'File parsed successfully.',
            `The parsed file type is ${
              this.$store.state[this.pageName].file.file_type
            }`,
            `The parsed height is ${
              this.$store.state[this.pageName].file.height
            }`,
            `The parsed width is ${this.$store.state[this.pageName].file.width}`,
          ];
        }
        if (this.pageName === 'ass1') {
          return [
            `Successfully parsed ${this.$store.state[this.pageName].file.name}`,
          ];
        }
      }
      if (this.$store.state[this.pageName].fileParseErrors) {
        return this.fileParseErrors;
      }
      return undefined;
    },
  },
};
</script>