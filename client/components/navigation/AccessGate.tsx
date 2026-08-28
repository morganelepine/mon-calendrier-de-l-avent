import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { StorageKeys } from "@/constants/storageKeys";
import { verifyWebAccessCode } from "@/services/access.service";
import { BlueBackground } from "@/components/utils/BlueBackground";

type Status = "checking" | "needs-install" | "locked" | "granted";

// True only inside an installed home-screen PWA (iOS `navigator.standalone`,
// or the standard `display-mode: standalone` media query elsewhere).
function isStandalone(): boolean {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return false;
    }
    const nav = navigator as Navigator & { standalone?: boolean };
    return (
        nav.standalone === true ||
        (typeof window.matchMedia === "function" &&
            window.matchMedia("(display-mode: standalone)").matches)
    );
}

// Web/PWA only.
// Two gates, in order:
// 1. Must know the shared access code.
// 2. Must be running from the installed home-screen icon, not a Safari tab.
export function AccessGate({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [status, setStatus] = useState<Status>(
        Platform.OS === "web" ? "checking" : "granted",
    );
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const checkStatus = async () => {
        const granted = await AsyncStorage.getItem(
            StorageKeys.webAccessGranted,
        );
        if (granted !== "true") {
            setStatus("locked");
            return;
        }
        setStatus(isStandalone() ? "granted" : "needs-install");
    };

    useEffect(() => {
        if (Platform.OS !== "web") return;
        checkStatus();
    }, []);

    if (status === "checking") return null;
    if (status === "granted") return <>{children}</>;

    const submit = async () => {
        const trimmed = code.trim();
        if (!trimmed || submitting) return;

        setSubmitting(true);
        setError(false);
        try {
            const ok = await verifyWebAccessCode(trimmed);
            if (!ok) {
                setError(true);
                return;
            }
            await AsyncStorage.setItem(StorageKeys.webAccessGranted, "true");
            setStatus(isStandalone() ? "granted" : "needs-install");
        } catch {
            setError(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (status === "locked") {
        return (
            <BlueBackground>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <ThemedText style={styles.title}>
                            You shall not pass
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            Ce calendrier est réservé à la crème de la crème. Si
                            tu en fais partie, entre le code que je t'ai donné
                            pour continuer.
                        </ThemedText>

                        <TextInput
                            value={code}
                            onChangeText={(value) => {
                                setCode(value);
                                setError(false);
                            }}
                            placeholder="Code d'accès"
                            placeholderTextColor={`${Colors.snow}99`}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            onSubmitEditing={submit}
                            style={styles.input}
                        />

                        {error && (
                            <ThemedText style={styles.error}>
                                Tu ne fais pas partie de l'élite à priori...
                            </ThemedText>
                        )}

                        <Pressable
                            onPress={submit}
                            disabled={submitting}
                            style={({ pressed }) => [
                                styles.button,
                                pressed && {
                                    backgroundColor: Colors.goldLight,
                                },
                            ]}
                        >
                            {submitting ? (
                                <ActivityIndicator color={Colors.green} />
                            ) : (
                                <ThemedText style={styles.buttonText}>
                                    Continuer
                                </ThemedText>
                            )}
                        </Pressable>
                    </View>
                </SafeAreaView>
            </BlueBackground>
        );
    }

    return (
        <BlueBackground>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <ThemedText style={styles.title}>
                        Encore une étape
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Ajoute ce calendrier à ton écran d'accueil (pour
                        l'utiliser comme la vraie app qu'il est à l'origine
                        #teamAndroid), puis ouvre-le depuis la nouvelle icône :
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        1. Appuie sur les 3 petits points en bas à droite de
                        Safari {"\n\n"}
                        2. Choisis{" "}
                        <ThemedText style={styles.bold}>
                            "Partager"
                        </ThemedText>{" "}
                        {"\n\n"}
                        3. Appuie sur{" "}
                        <ThemedText style={styles.bold}>
                            "Voir plus"
                        </ThemedText>{" "}
                        puis choisis{" "}
                        <ThemedText style={styles.bold}>
                            "Sur l'écran d'accueil"
                        </ThemedText>
                        {"\n\n"}
                        4. Ouvre l'app depuis la nouvelle icône
                    </ThemedText>
                </View>
            </SafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        gap: 20,
    },
    title: {
        fontFamily: "PallyBold",
        fontSize: 28,
        color: Colors.snow,
        textAlign: "center",
    },
    text: {
        color: Colors.snow,
        textAlign: "center",
    },
    bold: {
        fontFamily: "PoppinsBold",
        color: Colors.snow,
    },
    input: {
        width: "100%",
        maxWidth: 280,
        height: 48,
        borderRadius: 50,
        paddingHorizontal: 20,
        backgroundColor: `${Colors.snow}22`,
        borderWidth: 1,
        borderColor: Colors.snow,
        color: Colors.snow,
        fontFamily: "Poppins",
        textAlign: "center",
        // iOS Safari auto-zooms on focus for any input under 16px.
        fontSize: 16,
    },
    error: {
        color: Colors.pink,
        textAlign: "center",
    },
    button: {
        height: 48,
        minWidth: 140,
        paddingHorizontal: 28,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: Colors.snow,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: Colors.blue,
    },
});
