module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    "vue/html-closing-bracket-spacing": ["error", {
      "startTag": "always" | "never",
      "endTag": "always" | "never",
      "selfClosingTag": "always",
    }],
    'object-curly-spacing': ["error", "always", { "objectsInObjects": false }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
      },
    }],
    'spaced-comment': ['error', 'always', {
      line: {
        exceptions: ['-', '+'],
        markers: ['=', '!'],
      },
      block: {
        exceptions: ['-', '+'],
        markers: ['=', '!'],
        balanced: true,
      },
    }],
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'after-used' }],
    'template-curly-spacing': 'off',
    'no-multiple-empty-lines': ['error', { 'max': 0, 'maxBOF': 0 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': 'off',
    indent: ['error', 2],
    "vue/html-indent": ["error", 2],
    // 'import/order': ['error', {
    //   groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    //   'newlines-between': 'never',
    // }]
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last', {
      exceptions: {
        ArrayExpression: false,
        ArrayPattern: false,
        ArrowFunctionExpression: false,
        CallExpression: false,
        FunctionDeclaration: false,
        FunctionExpression: false,
        ImportDeclaration: false,
        ObjectExpression: false,
        ObjectPattern: false,
        VariableDeclaration: false,
        NewExpression: false,
      },
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}