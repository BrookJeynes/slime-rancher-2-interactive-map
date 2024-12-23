import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        settings: {
            "react": {
                "version": "detect",
            }
        }
    },
    { ignores: ["dist/"] },
    pluginReact.configs.flat.recommended,
    pluginJs.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        rules: {
            "react/react-in-jsx-scope": "off",
            "sort-imports": "error",
            "semi": ["error", "always"],
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "quotes": [2, "double"],
        },
    },
    { languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
];
