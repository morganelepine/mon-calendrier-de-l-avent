// To ensure unique Debug IDs get assigned to the generated bundles and source maps,
// add Sentry Serializer to the Metro configuration:

const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

module.exports = config;
