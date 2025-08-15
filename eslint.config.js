import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'error',
    },
  },
]
