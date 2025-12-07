export default ({ config }) => {
    if (process.env.EAS_BUILD_PROFILE === "prod-test-apk") {
        return {
            ...config,
            name: "Calendrier TEST",
            android: {
                ...config.android,
                package: "com.merrymate.moncalendrierdelavent.test",
            },
            ios: {
                ...config.ios,
                bundleIdentifier: "com.merrymate.moncalendrierdelavent.test",
            },
        };
    }

    // Sinon, build normal (prod)
    return config;
};

// npx eas build --platform android --profile prod-test-apk
