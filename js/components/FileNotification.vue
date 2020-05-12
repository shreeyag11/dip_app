<template>
  <div
    v-if="this.$store.state.fileParseSuccessful"
    class="notification is-primary notify"
  >
    Successfully parsed {{ this.$store.state.file.name }}
  </div>
</template>

<script>
export default {


};
</script>

<style scoped>
    .notify {
        padding: 0.8rem 0rem 0.8rem 0rem !important;
        margin-bottom: 0px !important;
        text-align: center;
    }
</style>