<template>
    <b-modal :active.sync="isActive"
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
                                :value="lightChar"
                                placeholder="~"
                                required>
                            </b-input>
                            <p class="help is-danger" v-if="lightCharInvalid"> Please enter a single character </p>
                        </b-field>

                        <b-field label="Enter the character to use for dark colored pixels">
                            <b-input
                                type="text"
                                :value="darkChar"
                                placeholder="8"
                                required>
                            </b-input>
                            <p class="help is-danger" v-if="darkCharInvalid"> Please enter a single character </p>
                        </b-field>
                        </b-field>

                        <b-field label="Enter the threshold used to determine light/dark color for pixels">
                            <b-input
                                type="text"
                                :value="threshold"
                                placeholder="0.5"
                                required>
                            </b-input>
                            <p class="help is-danger" v-if="thresholdInvalid"> Please enter a floating point value </p>
                        </b-field>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="closeModal">Close</button>
                        <button class="button is-primary" type="button" @click="submitModal">Convert</button>
                    </footer>
                </div>
            </form>
    </b-modal>
</template>

<script>
 export default {
     props: [
         "lightChar",
         "lightCharInvalid",
         "darkChar",
         "darkCharInvalid",
         "threshold",
         "thresholdInvalid",
         "isActive",
     ],
     methods: {
      closeModal() {
          this.isActive = false;
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
                  this.threshold = parseFloat(this.threshold)
              } else {
                  this.thresholdInvalid = true;
              }
          } else {
              this.thresholdInvalid = true;
          }
      }
     }
 }
</script>
