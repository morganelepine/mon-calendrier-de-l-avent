import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { useInitialization } from "@/hooks/useInitialization";
import { ThemedText } from "@/components/ThemedText";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";

export function InitializationGate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status, retry } = useInitialization();

    if (status === "loading") {
        return (
            <BlueBackground>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={Colors.snow} />
                </View>
            </BlueBackground>
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
                    <CustomButton onPress={retry}>Réessayer</CustomButton>
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
});
