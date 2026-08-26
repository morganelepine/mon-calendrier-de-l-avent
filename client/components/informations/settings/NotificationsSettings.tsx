import { useEffect, useState } from "react";
import { StyleSheet, View, Switch, Alert, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import { ThemedText } from "@/components/ThemedText";
import { Theme } from "@/constants/Colors";
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

            <View style={styles.row}>
                <ThemedText type="sectionText" style={{ color: Theme.tint }}>
                    {notificationsEnabled
                        ? "Désactiver les notifications"
                        : "Activer les notifications"}
                </ThemedText>

                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                    trackColor={{ false: "#ccc", true: Theme.tint }}
                    thumbColor="#fff"
                    style={styles.switch}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 20,
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
});
