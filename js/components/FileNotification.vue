<template>
  <div
    v-if="parseSuccessful"
    class="notification is-primary notify"
  >
    Successfully parsed {{ fileName }}
  </div>
</template>

<script>
export default {
  props: ['page'],
  computed: {
    parseSuccessful() {
      return this.$store.state[this.page].fileParseSuccessful;
    },
    fileName() {
      return this.$store.state[this.page].file.name;
    },
  },
};
</script>

<style scoped>
    .notify {
        padding: 0.8rem 0rem 0.8rem 0rem !important;
        margin-bottom: 0px !important;
        text-align: center;
    }
</style>