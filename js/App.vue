<template>
  <div id="app" >
    <FileNotification></FileNotification>
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
// TODO: Shreeya - make drag and drop work everywhere.

import NavBar from './components/NavBar.vue';
import FileNotification from './components/FileNotification.vue';

export default {
  components: {
    FileNotification,
    NavBar
  }  
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$section-padding: 1.5rem 1.5rem;

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>