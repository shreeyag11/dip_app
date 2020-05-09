import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileParseErrors: undefined,
    file: undefined,
    fileParseSuccessful: false,
  },
  mutations: {
    ADD_FILE_PARSE_ERRORS: (state, errors) => {
      state.fileParseSuccessful = false;
      state.fileParseErrors = errors;
    },
    ADD_FILE: (state, file) => {
      state.fileParseSuccessful = true;
      state.fileParseErrors = undefined;
      state.file = file;
    },
  },
  actions: {
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',

});
