/* eslint-disable no-param-reassign */
const mutations = {
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
  ADD_CSV_FILE: (state, file) => {
    state.ass1.csvFileUrl = file;
    console.log(file);
  },
};

export default mutations;