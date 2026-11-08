import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import { ThemedText } from "@/components/ThemedText";
import {
    REMINDER_SLOT_LABELS,
    ReminderSlotSelector,
} from "@/components/informations/settings/ReminderSlotSelector";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { useUser } from "@/contexts/UserContext";
import { getUser } from "@/services/user.service";
import {
    requestAndRegisterPushToken,
    clearPushToken,
    saveReminderSlot,
} from "@/services/notifications.service";
import type { ReminderSlot } from "@/types/types";

export const NotificationsSettings = () => {
    const { userUuid } = useUser();

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [reminderSlot, setReminderSlot] = useState<ReminderSlot>("morning");

    useEffect(() => {
        if (!userUuid) return;
        getUser(userUuid)
            .then((user) => {
                setNotificationsEnabled(!!user.pushToken);
                setReminderSlot(user.reminderSlot ?? "morning");
            })
            .catch(() => setNotificationsEnabled(false));
    }, [userUuid]);

    const changeReminderSlot = async (slot: ReminderSlot) => {
        if (!userUuid || slot === reminderSlot) return;

        const previousSlot = reminderSlot;
        setReminderSlot(slot);
        try {
            await saveReminderSlot(userUuid, slot);
        } catch {
            setReminderSlot(previousSlot);
            Alert.alert(
                "Modification impossible",
                "L'heure du rappel n'a pas pu être enregistrée. Réessayez plus tard.",
            );
        }
    };

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
                    ? `Vous recevrez un rappel chaque jour de décembre ${REMINDER_SLOT_LABELS[reminderSlot].sentence} pour ne pas oublier d'ouvrir la case du jour.`
                    : "Activez les notifications pour recevoir un rappel vous invitant à ouvrir la case du jour."}
            </ThemedText>

            <SettingsToggleRow
                label={"Activer les notifications"}
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
            />

            {notificationsEnabled && (
                <ReminderSlotSelector
                    value={reminderSlot}
                    onChange={changeReminderSlot}
                />
            )}
        </>
    );
};
