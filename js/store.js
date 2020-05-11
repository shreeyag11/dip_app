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
    PARSE_FILE: function (context, dropFile) {
      const reader = new FileReader();
      reader.readAsText(dropFile);
      reader.onerror = error => console.log(error);
      reader.onload = event => {
        let text = event.target.result.trim();
        try {
          let header = this._vm.lib.parse_header_json(text);
          header.pixels = new Uint8ClampedArray(this._vm.lib.parse_pixels_json(text));
          header.name = dropFile.name;
          context.commit("ADD_FILE", header);
        } catch (errors) {
          context.commit("ADD_FILE_PARSE_ERRORS", errors);
        }
      };
    }
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
});
