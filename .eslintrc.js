module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    indent: ["error", 2],
    "max-len": ["error", { code: 80, ignoreUrls: true, ignoreComments: true }],
    "no-extra-semi": ["error"],
    "eol-last": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "react/no-unescaped-entities": 0
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "@typescript-eslint", "prettier"],
}
