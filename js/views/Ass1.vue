<template>
  <section class="section is-full">
    <div class="columns is-centered">
      <div class="column is-narrow is-size-2 has-text-centered">
        Assignment 1
      </div>
      <div class="column is-half">
        <article class="box">
          <b-button
            type="is-link"
            tag="a"
            :disabled="convIsDisabled"
            :download="csvFileName"
            :href="$store.state.ass1.csvFileUrl"
          >
            Convert to a CSV file
          </b-button>

          <b-button
            type="is-link"
            :disabled="convIsDisabled"
            @click="isAsciiModalActive = true"
          >
            Convert to ASCII Art
          </b-button>
        </article>
      </div>
    </div>
    <b-modal :active.sync="isAsciiModalActive"
             has-modal-card
             trap-focus
             :destroy-on-hide="false"
             aria-role="dialog"
             aria-model
    >
        <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Convert to ASCII Art</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Enter the character to use for light colored pixels">
                            <b-input
                                type="text"
                                :value="asciiLightChar"
                                placeholder="~"
                                required>
                            </b-input>
                            <p class="help is-danger" v-if="asciiLightCharInvalid"> Please enter a single character </p>
                        </b-field>

                        <b-field label="Enter the character to use for dark colored pixels">
                            <b-input
                                type="text"
                                :value="asciiDarkChar"
                                placeholder="8"
                                required>
                            </b-input>
                            <p class="help is-danger" v-if="asciiDarkCharInvalid"> Please enter a single character </p>
                        </b-field>
                        </b-field>

                        <b-field label="Enter the threshold used to determine light/dark color for pixels">
                            <b-input
                                type="text"
                                :value="asciiThreshold"
                                placeholder="0.5"
                                required>
                            </b-input>
                            <p class="help is-danger" v-if="asciiThresholdInvalid"> Please enter a floating point value </p>
                        </b-field>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="closeAsciiModal">Close</button>
                        <button class="button is-primary" type="button" @click="submitAsciiModal">Convert</button>
                    </footer>
                </div>
            </form>
    </b-modal>
    <ImageViewer />
    <Log :page-name="pageName" />
    <FilePicker :page-name="pageName" />
  </section>
</template>

<script>
import ImageViewer from '../components/Ass1/Renderer.vue';
import AsciiModal from '../components/Ass1/AsciiModal.vue';
import FilePicker from '../components/FilePicker.vue';
import Log from '../components/Log.vue';

export default {
  components: {
    ImageViewer,
    FilePicker,
      Log,
      AsciiModal
  },
  data() {
      return {
          isAsciiModalActive: false,
          asciiLightChar: undefined,
          asciiDarkChar: undefined,
          asciiThreshold: undefined,
          asciiLightCharInvalid: undefined,
          asciiDarkCharInvalid: undefined,
          asciiThresholdInvalid: undefined
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
        filename = filename.replace('txt', 'csv');

        return filename;
      }

      return false;
    },
    asciiFileName() {
      if (this.$store.state.ass1.file) {
        let filename = this.$store.state.ass1.file.name;
        filename = filename.replace('.txt', '_ascii_art.txt');

        return filename;
      }

      return false;
    },
  },
  methods: {
    dropHandler(ev) {
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i += 1) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            const file = ev.dataTransfer.items[i].getAsFile();
            this.$store.dispatch('PARSE_FILE', {
              file,
              type: this.pageName,
            });
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i += 1) {
          console.log(
            `2. ... file[${i}].name = ${ev.dataTransfer.files[i].name}`,
          );
        }
      }
    },
    dragOverHandler(ev) {
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
    },
      closeAsciiModal() {
          this.isAsciiModalActive = false;
          this.asciiLightChar = undefined;
          this.asciiDarkChar = undefined;
          this.asciiThreshold = undefined;
          this.asciiLightCharInvalid = undefined;
          this.asciiDarkCharInvalid = undefined;
          this.asciiThresholdInvalid = undefined;
      },
      submitAsciiModal() {
          if (this.asciiLightChar.trim) {
              if (this.asciiLightChar.trim().length !== 1) {
                  this.asciiLightCharInvalid = true;
              } else {
                  this.asciiLightChar = this.asciiLightChar.trim();
              }
          } else {
                  this.asciiLightCharInvalid = true;
          }

          if (this.asciiDarkChar.trim) {
              if (this.asciiDarkChar.trim().length !== 1) {
                  this.asciiDarkCharInvalid = true;
              } else {
                  this.asciiDarkChar = this.asciiDarkChar.trim();
              }
          } else {
                  this.asciiLightCharInvalid = true;
          }

          if (this.asciiThreshold) {
              if (parseFloat(this.asciiThreshold)) {
                  this.asciiThreshold = parseFloat(this.asciiThreshold)
              } else {
                  this.asciiThresholdInvalid = true;
              }
          } else {
              this.asciiThresholdInvalid = true;
          }
      }
  },
};
</script>

<style scoped>
</style>
