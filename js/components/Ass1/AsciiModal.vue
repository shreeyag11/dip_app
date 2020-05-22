<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Convert to ASCII Art</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Enter the character to use for light colored pixels">
          <b-input v-model="lightChar" type="text" placeholder="~" required />
          <p v-if="lightCharInvalid" class="help is-danger">Please enter a single character</p>
        </b-field>

        <b-field label="Enter the character to use for dark colored pixels">
          <b-input v-model="darkChar" type="text" placeholder="8" required />
          <p v-if="darkCharInvalid" class="help is-danger">Please enter a single character</p>
        </b-field>

        <b-field label="Enter the threshold used to determine light/dark color for pixels">
          <b-input v-model="threshold" type="text" placeholder="0.5" required />
          <p v-if="thresholdInvalid" class="help is-danger">Please enter a floating point value</p>
        </b-field>
        <b-field label="Image Width">
          <b-numberinput
            v-model="imgWidth"
            controls-position="compact"
            controls-rounded
            class="is-fullwidth"
          />
        </b-field>
      </section>
      <footer class="modal-card-foot is-fullwidth tile is-parent" >
          <button class="button tile" type="button" @click="closeModal">Clear</button>
          <button
            class="button is-primary tile"
            type="button"
            @click="submitModal"
          >Convert</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ["imgWidth"],
  data() {
    return {
      lightChar: "2",
      lightCharInvalid: undefined,
      darkChar: "3",
      darkCharInvalid: undefined,
      threshold: "0.3",
      thresholdInvalid: undefined,
      isActive: undefined
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("TOGGLE_ASCII_MODAL_OFF");
      this.lightChar = undefined;
      this.darkChar = undefined;
      this.threshold = undefined;
      this.lightCharInvalid = undefined;
      this.darkCharInvalid = undefined;
      this.thresholdInvalid = undefined;
    },
    submitModal() {
      if (this.lightChar.trim) {
        if (this.lightChar.trim().length !== 1) {
          this.lightCharInvalid = true;
        } else {
          this.lightChar = this.lightChar.trim();
        }
      } else {
        this.lightCharInvalid = true;
      }

      if (this.darkChar.trim) {
        if (this.darkChar.trim().length !== 1) {
          this.darkCharInvalid = true;
        } else {
          this.darkChar = this.darkChar.trim();
        }
      } else {
        this.lightCharInvalid = true;
      }

      if (this.threshold) {
        if (parseFloat(this.threshold)) {
          this.threshold = parseFloat(this.threshold);
        } else {
          this.thresholdInvalid = true;
        }
      } else {
        this.thresholdInvalid = true;
      }

      if (
        !this.lightCharInvalid ||
        !this.darkCharInvalid ||
        !this.thresholdInvalid
      ) {
        this.$store.dispatch("ASS1_CONVERT_TO_ASCII", {
          lightChar: this.lightChar,
          darkChar: this.darkChar,
          threshold: this.threshold,
          imgWidth: this.imgWidth
        });
      }

      const a = document.createElement("a");
      a.setAttribute("href", this.$store.state.ass1.asciiFileUrl);
      a.setAttribute(
        "download",
        this.$store.state.ass1.file.name.replace(".txt", "_ascii_art.txt")
      );
      a.click();
      a.remove();
    }
  }
};
</script>

<style scoped>
.convert {
  margin-left: auto;
  margin-right: auto;
}

</style>
