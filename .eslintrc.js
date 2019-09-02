  module.exports = {
  globals: {
    rhino3dm: false,
    Rhino3dm: false,
    RhinoCompute: false,
  },

  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    '@vue/standard'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'only-multiline']
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
}
