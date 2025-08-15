// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "expo",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { project: ["./tsconfig.json"] },
    ignorePatterns: ["*/babel.config.js", "*.json", "*/.eslintrc.js"],
    plugins: ["@typescript-eslint"],
    rules: {
        "consistent-return": 2,
        "@typescript-eslint/explicit-function-return-type": 0,
    },
    overrides: [
        {
            files: ["*.ts"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": 2,
            },
        },
    ],
};
