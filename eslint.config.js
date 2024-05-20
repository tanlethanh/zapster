import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					usePrettierrc: false,
					useTabs: true,
				},
			],
		},
	},
];
