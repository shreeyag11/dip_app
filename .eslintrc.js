module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/recommended',
      'airbnb-base'
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error',
      'max-len': 'off',
      'eol-last': 'off',
      'linebreak-style': 'off',
      'vue/require-v-for-key': 'off',
      'no-underscore-dangle': 'off'
    }
  }