import React from "react";
import { StyleSheet, View, ActivityIndicator, Pressable } from "react-native";
import { useInitialization } from "@/hooks/useInitialization";
import { ThemedText } from "@/components/ThemedText";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { Colors } from "@/constants/Colors";

export function InitializationGate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status, retry } = useInitialization();

    if (status === "loading") {
        return (
            <BackgroundImage image="blue_background_darker_d10kn5">
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={Colors.snow} />
                </View>
            </BackgroundImage>
        );
    }

    if (status === "error") {
        return (
            <BackgroundImage image="11_pfqcwp">
                <View style={styles.container}>
                    <ThemedText style={styles.text}>
                        Oops ! Les lutins n’arrivent pas à&nbsp;ouvrir la porte
                        de l’atelier...
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Vérifiez votre connexion internet puis réessayez.
                    </ThemedText>
                    <Pressable
                        onPress={retry}
                        style={({ pressed }) => [
                            styles.button,
                            pressed && { backgroundColor: Colors.goldLight },
                        ]}
                    >
                        <ThemedText style={styles.buttonText}>
                            Réessayer
                        </ThemedText>
                    </Pressable>
                </View>
            </BackgroundImage>
        );
    }

    return <>{children}</>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        gap: 16,
    },
    text: { color: Colors.snow, textAlign: "center" },
    button: {
        height: 48,
        paddingHorizontal: 28,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: Colors.snow,
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.green,
    },
});
