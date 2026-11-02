// The preview APK installs alongside the store app, under its own package id.
export default ({ config }) => {
    if (process.env.EAS_BUILD_PROFILE !== "preview") return config;

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
};
