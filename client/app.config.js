// Off until La Hotte Magique can be bought
const WIDGETS_ENABLED = false;

const WIDGETS_PLUGIN = [
    "react-native-android-widget",
    {
        fonts: [
            "./assets/fonts/FreightNeo/Fonts/FreightNeo W03 Bold.ttf",
            "./assets/fonts/FreightNeo/Fonts/FreightNeo W03 Semi.ttf",
        ],
        widgets: [
            {
                name: "HouseCountdown",
                label: "Maisonnette",
                description: "Le nombre de nuits avant Noël",
                previewImage: "./assets/images/widget/house-preview.webp",
                minWidth: "40dp",
                minHeight: "100dp",
                targetCellWidth: 1,
                targetCellHeight: 2,
                updatePeriodMillis: 1800000,
                resizeMode: "vertical",
            },
            {
                name: "SnowballCountdown",
                label: "Boule à neige",
                description: "Le nombre de nuits avant Noël",
                previewImage: "./assets/images/widget/snowball-preview.webp",
                minWidth: "100dp",
                minHeight: "100dp",
                targetCellWidth: 2,
                targetCellHeight: 2,
                updatePeriodMillis: 1800000,
                resizeMode: "horizontal|vertical",
            },
            {
                name: "GiftsCountdown",
                label: "Cadeaux de Noël",
                description: "Les jours et les heures avant Noël",
                previewImage: "./assets/images/widget/gifts-preview.webp",
                minWidth: "100dp",
                minHeight: "250dp",
                targetCellWidth: 2,
                targetCellHeight: 4,
                updatePeriodMillis: 1800000,
                resizeMode: "vertical",
            },
        ],
    },
];

export default ({ config }) => {
    const withWidgets =
        WIDGETS_ENABLED || process.env.EAS_BUILD_PROFILE !== "production";
    if (withWidgets) {
        config = { ...config, plugins: [...config.plugins, WIDGETS_PLUGIN] };
    }

    if (process.env.EAS_BUILD_PROFILE === "preview") {
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

// npx eas build --platform android --profile preview
