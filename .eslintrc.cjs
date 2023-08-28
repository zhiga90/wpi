/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-debugger': isProd ? 'error' : 'off',
    'no-unused-vars': isProd ? 'error' : 'warn',
    'comma-dangle': [isProd ? 'error' : 'warn', 'always-multiline'],
  },
}
