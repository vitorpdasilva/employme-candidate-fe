module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "unused-imports",
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "indent": ["error", 2],
    "max-len": ["error", { code: 80,  ignoreComments: true }],
    "object-curly-spacing": ["error", "always"],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { 
        "vars": "all", "varsIgnorePattern": "^_", 
        "args": "after-used", "argsIgnorePattern": "^_" 
      },
    ]
  }
};
