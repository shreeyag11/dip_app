<template>
  <div
    id="app"
  >
    <FileNotification :page="pageName" />
    <NavBar />
    <router-view id="routerView" />
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
  computed: {
    pageName() {
      return this.$store.state.pageNameRev[this.$store.state.route.name];
    },
  },
  methods: {
   
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