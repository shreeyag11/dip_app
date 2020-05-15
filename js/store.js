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
    home: {
      fileParseErrors: undefined,
      file: undefined,
      fileParseSuccessful: false,
    },
    page: ['viewer', 'ass1', 'home'],
    pageName: {
      viewer: 'Viewer',
      ass1: 'Assignment 1',
      home: 'Home',
    },
    pageNameRev: {
      'Assignment 1': 'ass1',
      Viewer: 'viewer',
      Home: 'home',
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
      reader.onerror = (error) => console.log(error);

      if (type === 'viewer') {
        reader.onload = (event) => {
          const text = event.target.result.trim();
          try {
            const header = this._vm.lib.viewerParseHeader(text);
            header.pixels = new Uint8ClampedArray(this._vm.lib.viewerParsePixels(text));
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
        reader.onload = (event) => {
          const text = event.target.result;
          try {
            const header = {
              name: file.name,
            };
            header.values = this._vm.lib.ass1ParseFile(text);
            console.log(header.values);
            context.commit('ADD_FILE', {
              file: header,
              type: 'ass1',
            });
          } catch (errors) {
            context.commit('ADD_FILE_PARSE_ERRORS', {
              errors,
              type: 'ass1',
            });
          }
        };
      }
    },
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
});
