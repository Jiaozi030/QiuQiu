import vue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.js", "**/*.vue"],
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      vue
    },
    rules: {
      "vue/multi-word-component-names": "off",  // 允许单词组件名
      "vue/no-unused-vars": "warn",
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
