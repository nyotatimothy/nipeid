module.exports = {
  extends: "next/core-web-vitals",
  ignorePatterns: [
    "**/generated/**/*",
    "**/prisma/generated/**/*",
    "**/node_modules/**/*",
    "**/.next/**/*",
    "**/dist/**/*",
    "**/wasm.js",
    "**/react-native.js",
    "**/runtime/**/*",
    "**/*.js"
  ],
  rules: {
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-require-imports": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off"
  }
} 