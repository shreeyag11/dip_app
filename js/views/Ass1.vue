<template>
  <section class="section is-full">
    <div class="column is-narrow is-size-2 has-text-centered">Assignment 1</div>

    <b-tabs v-if="parseSuccessful" position="is-centered">
      <b-tab-item label="Convert to a CSV file" class="menuItem" style="margin-top: 1.25rem;">
        <b-field label="Image Width">
          <b-numberinput
            v-model="imgWidth"
            controls-position="compact"
            controls-rounded
            class="is-fullwidth"
            :disabled="convIsDisabled"
          />
        </b-field>
        <b-button
          :disabled="convIsDisabled"
          class="is-primary"
          style="margin-top: 1.25rem;"
          @click="convToCsvClick"
        >Convert</b-button> 
      </b-tab-item>

      <b-tab-item label="Convert to ASCII Art">
        <AsciiModal :img-width="imgWidth" />
      </b-tab-item>
    </b-tabs>

    <ImageViewer />
    <Log :page-name="pageName" />
    <FilePicker :page-name="pageName" />
  </section>
</template>

<script>
import ImageViewer from "../components/Ass1/Renderer.vue";
import AsciiModal from "../components/Ass1/AsciiModal.vue";
import FilePicker from "../components/FilePicker.vue";
import Log from "../components/Log.vue";

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log,
    AsciiModal
  },
  data() {
    return {
      imgWidth: 256
    };
  },
  computed: {
    pageName() {
      return this.$store.state.pageNameRev[this.$store.state.route.name];
    },
    convIsDisabled() {
      return !this.$store.state.ass1.fileParseSuccessful;
    },
    csvFileName() {
      if (this.$store.state.ass1.file) {
        let filename = this.$store.state.ass1.file.name;
        filename = filename.replace("txt", "csv");
        return filename;
      }

      return false;
    },
    asciiFileName() {
      if (this.$store.state.ass1.file) {
        let filename = this.$store.state.ass1.file.name;
        filename = filename.replace(".txt", "_ascii_art.txt");
        return filename;
      }
      return false;
    },
    parseSuccessful() {
      return this.$store.state["ass1"].fileParseSuccessful;
    }
  },
  methods: {
    dropHandler(ev) {
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i += 1) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === "file") {
            const file = ev.dataTransfer.items[i].getAsFile();
            this.$store.dispatch("PARSE_FILE", {
              file,
              type: this.pageName
            });
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i += 1) {
          console.log(
            `2. ... file[${i}].name = ${ev.dataTransfer.files[i].name}`
          );
        }
      }
    },
    dragOverHandler(ev) {
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
    },
    convToCsvClick() {
      this.$store.dispatch("ASS1_CONVERT_TO_CSV", {
        imgWidth: this.$store.state.ass1.imgWidth
      });

      const a = document.createElement("a");
      a.setAttribute("href", this.$store.state.ass1.csvFileUrl);
      a.setAttribute(
        "download",
        this.$store.state.ass1.file.name.replace(".txt", ".csv")
      );
      a.click();
      a.remove();
    },
    convToAsciiClick() {
      this.$store.commit("TOGGLE_ASCII_MODAL_ON");
    }
  }
};
</script>

<style scoped>
.menuItem {
  text-align: center;
  box-sizing: unset;
  margin-left: auto;
  margin-right: auto;
}

</style>
