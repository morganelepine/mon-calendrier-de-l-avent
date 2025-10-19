// __DEV__ est une variable globale fournie automatiquement par React Native
// Elle vaut `true` en développement (via Expo ou Metro bundler)
// et `false` dans les builds de production (Play Store, TestFlight, etc.)
const isLocal = __DEV__;

export const API_URL = isLocal
    ? process.env.EXPO_PUBLIC_API_URL_DEV
    : process.env.EXPO_PUBLIC_API_URL_PROD;
