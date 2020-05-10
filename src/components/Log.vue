<template>
  <div class="container">
    <article :class="logMessageClass" id="logContainer">
      <div class="message-header" id="hint">
        <p>Log</p>
      </div>
      <div class="message-body" id="errorLog">
        <p v-for="msg in logMessage">{{ msg.trim() }}</p>
      </div>
    </article>
  </div>
</template>

<script>
import Vuex from "vuex";
export default {
  computed: {
    fileParseErrors: function() {
      if (this.$store.state.fileParseErrors) {
        if (this.$store.state.fileParseErrors.split) {
          let errors = this.$store.state.fileParseErrors.split("#!@");
        }
        else {
          let errors = [this.$store.state.fileParseErrors];
        }
        
        if (errors.length >= 15) {
          errors = errors.slice(0, 15);
          errors.push("😭 And I stopped counting after the first 15 errors");
        }
        return errors;
      } else return undefined;
    },
    logMessageClass: function() {
      if (this.$store.state.fileParseSuccessful) return "message is-primary";
      else if (this.fileParseErrors) return "message is-danger";
      else return "message is-warning";
    },
    logMessage: function() {
      if (this.$store.state.fileParseSuccessful) {
        return [
          "File parsed successfully.",
          `The parsed file type is ${this.$store.state.file.file_type}`,
          `The parsed height is ${this.$store.state.file.height}`,
          `The parsed width is ${this.$store.state.file.width}`
        ];
      } else if (this.$store.state.fileParseErrors) {
        return this.fileParseErrors;
      } else {
        return undefined;
      }
    }
  }
};
</script>