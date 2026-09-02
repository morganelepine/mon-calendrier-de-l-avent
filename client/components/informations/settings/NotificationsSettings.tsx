import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import { ThemedText } from "@/components/ThemedText";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { useUser } from "@/contexts/UserContext";
import { getUser } from "@/services/user.service";
import {
    requestAndRegisterPushToken,
    clearPushToken,
} from "@/services/notifications.service";

export const NotificationsSettings = () => {
    const { userUuid } = useUser();

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        if (!userUuid) return;
        getUser(userUuid)
            .then((user) => setNotificationsEnabled(!!user.pushToken))
            .catch(() => setNotificationsEnabled(false));
    }, [userUuid]);

    const toggleNotifications = async (value: boolean) => {
        if (!userUuid) return;

        if (!value) {
            setNotificationsEnabled(false);
            await clearPushToken(userUuid);
            return;
        }

        // The OS only lets us prompt for permission once - if it was
        // already refused and can't be asked again, sending the user to
        // their system settings is the only way left to turn this on.
        const { status, canAskAgain } =
            await Notifications.getPermissionsAsync();
        if (status !== "granted" && !canAskAgain) {
            Alert.alert(
                "Notifications désactivées",
                "Activez les notifications pour cette application depuis les réglages de votre téléphone.",
                [
                    { text: "Annuler", style: "cancel" },
                    {
                        text: "Ouvrir les réglages",
                        onPress: () => Linking.openSettings(),
                    },
                ],
            );
            return;
        }

        await requestAndRegisterPushToken(userUuid);
        const refreshedUser = await getUser(userUuid);
        setNotificationsEnabled(!!refreshedUser.pushToken);
    };

    return (
        <>
            <ThemedText
                type="sectionText"
                style={{ fontFamily: "PoppinsBold" }}
            >
                {notificationsEnabled
                    ? "Les notifications sont activées"
                    : "Les notifications sont désactivées"}
            </ThemedText>
            <ThemedText type="sectionText">
                {notificationsEnabled
                    ? "Vous recevrez un petit rappel chaque matin pour ne pas oublier d'ouvrir la case du jour."
                    : "Activez les notifications pour recevoir un rappel chaque matin vous invitant à ouvrir la case du jour."}
            </ThemedText>

            <SettingsToggleRow
                label={
                    notificationsEnabled
                        ? "Désactiver les notifications"
                        : "Activer les notifications"
                }
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
            />
        </>
    );
};
