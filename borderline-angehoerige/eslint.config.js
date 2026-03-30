import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Ignored paths
  { ignores: ["dist/", "build/", "node_modules/", "*.config.*"] },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules (type-aware disabled for speed in pre-commit)
  ...tseslint.configs.recommended,

  // React Hooks rules
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // React 19 compiler rules — warn for now (existing code needs refactoring)
      "react-hooks/refs": "warn",
      "react-hooks/immutability": "warn",
    },
  },

  // Project-specific tweaks
  {
    rules: {
      // Allow unused vars prefixed with _ (common pattern)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Allow explicit any in a codebase that already uses it
      "@typescript-eslint/no-explicit-any": "off",
      // Allow variables used before definition (useCallback hoisting patterns)
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
    },
  },

  // Disable formatting rules (Prettier handles formatting)
  eslintConfigPrettier
);
