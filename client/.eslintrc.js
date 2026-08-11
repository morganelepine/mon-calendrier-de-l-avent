// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "expo",
    ],
    env: { node: true },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ["babel.config.js", "metro.config.js", "*.json", "*/.eslintrc.js"],
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
        {
            files: ["*.ts", "*.tsx"],
            settings: {
                "import/resolver": {
                    typescript: {},
                },
            },
        },
    ],
};
