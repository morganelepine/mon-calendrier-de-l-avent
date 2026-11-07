import { Linking } from "react-native";
import { showToast } from "@/components/utils/Toast";

// Expected failure on devices with no app for the link (e.g. no browser
// enabled): the user is told, and it is not worth reporting to Sentry.
export const openExternalUrl = (url: string): void => {
    Linking.openURL(url).catch(() => {
        showToast("Impossible d'ouvrir ce lien", "long");
    });
};
