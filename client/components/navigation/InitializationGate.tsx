import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    ImageBackground,
    Pressable,
} from "react-native";
import { useInitialization } from "@/hooks/useInitialization";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export function InitializationGate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status, retry } = useInitialization();

    if (status === "loading") {
        return (
            <ImageBackground
                source={{
                    uri: getCloudinaryImageUrl("blue_background_darker_d10kn5"),
                }}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={Colors.snow} />
                    <ThemedText style={styles.text}>Initialisation…</ThemedText>
                </View>
            </ImageBackground>
        );
    }

    if (status === "error") {
        return (
            <ImageBackground
                source={{
                    uri: getCloudinaryImageUrl("11_pfqcwp"),
                }}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.container}>
                    <ThemedText style={styles.text}>
                        Oops ! Les lutins n’arrivent pas à&nbsp;ouvrir la porte
                        de l’atelier...
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Vérifiez votre connexion internet puis réessayez.
                    </ThemedText>
                    <Pressable onPress={retry} style={styles.button}>
                        <ThemedText style={styles.buttonText}>
                            Réessayer
                        </ThemedText>
                    </Pressable>
                </View>
            </ImageBackground>
        );
    }

    return <>{children}</>;
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
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
