<template>
  <div id="app" >
    <NavBar></NavBar>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/viewer">Viewer</router-link>
    </div>
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

<style scoped>

</style>