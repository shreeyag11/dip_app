<template>
  <div class="container">
    <article class="message is-dark" id="logContainer">
      <div class="message-header" id="hint">
        <p>Log</p>
      </div>
      <div class="message-body" id="errorLog">
        {{ fileParseErrors }}
      </div>
    </article>
  </div>
</template>

<script>
import Vuex from 'vuex';
export default {
  computed : Vuex.mapState([
    'fileParseErrors'
  ]) 
};
</script>