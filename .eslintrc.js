module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
    requireConfigFile: false,
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
    es6: true,
    jest: true,
  },
  plugins: ['babel', 'jsx-a11y', 'react', 'prettier', 'standard', 'lodash'],
  extends: [
    'standard',
    'prettier',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:lodash/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'no-console': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'eol-last': 0,
    'comma-dangle': 0,
    'jsx-a11y/no-autofocus': [
      0,
      {
        ignoreNonDOM: true,
      },
    ],
    'react/jsx-uses-vars': ['error'],
    'react/jsx-uses-react': 0,
    'no-unused-vars': ['warn', { vars: 'local', args: 'none', ignoreRestSiblings: true }],
    'space-before-function-paren': 0,
    'prettier/prettier': 0,
    'lodash/prefer-lodash-method': [
      0,
      {
        ignoreMethods: ['map', 'filter', 'reduce'],
      },
    ],
    'lodash/prefer-constant': 0,
    'lodash/prefer-noop': 0,
    eqeqeq: [0, 'always', { null: 'ignore' }],
    'lodash/import-scope': 0,
    'lodash/prefer-matches': 0,
    'no-template-curly-in-string': 0,
    camelcase: 0,
  },
  // rules: {
  //   'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
  // },
}
