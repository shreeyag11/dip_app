/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    viewer: {
      fileParseErrors: undefined,
      file: undefined,
      fileParseSuccessful: false,
    },
    ass1: {
      fileParseErrors: undefined,
      file: undefined,
      fileParseSuccessful: false,
    },
  },
  mutations: {
    ADD_FILE_PARSE_ERRORS: (state, { errors, type }) => {
      state[type].fileParseSuccessful = false;
      state[type].fileParseErrors = errors;
      state[type].file = undefined;
    },
    ADD_FILE: (state, { file, type }) => {
      state[type].fileParseSuccessful = true;
      state[type].fileParseErrors = undefined;
      state[type].file = file;
    },
  },
  actions: {
    PARSE_FILE(context, { file, type }) {
      const reader = new FileReader();
      reader.readAsText(file);

      if (type === 'viewer') {
        reader.onerror = (error) => console.log(error);
        reader.onload = (event) => {
          const text = event.target.result.trim();
          try {
            const header = this._vm.lib.parse_header_json(text);
            header.pixels = new Uint8ClampedArray(this._vm.lib.parse_pixels_json(text));
            header.name = file.name;
            context.commit('ADD_FILE', {
              file: header,
              type: 'viewer',
            });
          } catch (errors) {
            context.commit('ADD_FILE_PARSE_ERRORS', {
              errors,
              type: 'viewer',
            });
          }
        };
      } else if (type === 'ass1') {
        console.log(`read: ${file.name}`);
      }
    },
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
});
