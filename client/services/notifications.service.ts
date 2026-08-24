import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { apiFetch } from "@/services/apiFetch";
import { Sentry } from "@/services/sentry.service";

export function configureNotificationHandler(): void {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: false,
            shouldShowList: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
}

export const requestAndRegisterPushToken = async (
    uuid: string,
): Promise<void> => {
    try {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") return;

        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        const { data: pushToken } = await Notifications.getExpoPushTokenAsync({
            projectId,
        });

        await apiFetch(`/users/${uuid}/push-token`, {
            method: "POST",
            body: { pushToken },
        });
    } catch (error) {
        Sentry.captureException(error, {
            extra: { context: "requestAndRegisterPushToken" },
        });
    }
};
