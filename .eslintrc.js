const path = require("path");

const ERROR = 2;
const OFF = 0;

module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "react/prop-types": OFF, //Use flow annotations instead of prop-types
    /**
     * overridden eslint:recommended rules
     */
    "no-console": OFF, //Allow console logging. In production build remove it with uglifyJsPlugin.
    "no-unused-vars": [ERROR, { args: "none" }]
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    "cypress/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["cypress", "flowtype", "react", "prettier"]
};
