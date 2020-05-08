<template>
  <div id="app" >
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '/src/components/NavBar.vue';

export default {
  components: {
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