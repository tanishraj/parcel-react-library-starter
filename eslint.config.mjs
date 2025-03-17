import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginReactPerf from 'eslint-plugin-react-perf';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['node_modules', 'dist'] },
  { files: ['**/*.{js,ts,jsx,tsx}'] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    settings: { react: { version: 'detect' } },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,

  {
    name: 'React',
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      'react-perf': pluginReactPerf,
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReactRefresh.configs.recommended.rules,
      ...pluginReactPerf.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,

      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react-perf/jsx-no-new-array-as-prop': 'off',

      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link', 'RouterLink'],
          aspects: ['invalidHref'],
        },
      ],
    },
  },

  {
    name: 'ESLint + Prettier',
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
