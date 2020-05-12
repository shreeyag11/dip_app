<template>
  <div
    id="app"
    @drop="dropHandler"
    @dragover="dragOverHandler"
  >
    <FileNotification />
    <NavBar />
    <router-view id="routerView"/>
  </div>
</template>

<script>
// TODO: Shreeya - make div #app cover the whole screen

import NavBar from './components/NavBar.vue';
import FileNotification from './components/FileNotification.vue';

export default {
  components: {
    FileNotification,
    NavBar,
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
            this.$store.dispatch('PARSE_FILE', file);
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

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma-pageloader";

$section-padding: 1.5rem 1.5rem;

@import "~bulma";
@import "~buefy/src/scss/buefy";

body {
  height: 100%;
  width: 100%;
  position: absolute;
}

#app {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#routerView {
  flex: 1 1 auto;
}
</style>