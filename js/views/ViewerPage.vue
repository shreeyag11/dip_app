<template>
  <section
    class="section is-full"
    @drop="dropHandler"
    @dragover="dragOverHandler"
  >
    <ImageViewer />
    <Log :page-name="pageName" />
    <FilePicker :page-name="pageName" />
  </section>
</template>

<script>
import ImageViewer from '../components/Viewer/ImageViewer.vue';
import FilePicker from '../components/FilePicker.vue';
import Log from '../components/Log.vue';

export default {
  components: {
    ImageViewer,
    FilePicker,
    Log,
  },
  computed: {
    pageName() {
      return this.$store.state.pageNameRev[this.$store.state.route.name];
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
  },
};
</script>
