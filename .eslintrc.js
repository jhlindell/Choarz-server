module.exports = {
  env: {
    node: true
  },
  extends: ["eslint-config-airbnb-base", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"]
  }
};
