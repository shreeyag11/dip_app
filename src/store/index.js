import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileParseErrors: undefined,
  },
  mutations: {
    ADD_FILE_PARSE_ERRORS: (state, errors) => {
      state.fileParseErrors = errors;
    },
  },
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',

});
