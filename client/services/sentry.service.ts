import * as Sentry from "@sentry/react-native";

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const initSentry = (): void => {
    Sentry.init({
        dsn,
        enabled: !!dsn,
        environment: __DEV__ ? "development" : "production",

        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production, or using tracesSampler for finer control
        tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    });
};

export { Sentry };
