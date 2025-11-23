import {
    StyleSheet,
    Linking,
    ImageBackground,
    View,
    Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { Colors } from "@/constants/Colors";

export default function ForceUpdateScreen() {
    const storeUrl = "market://details?id=com.merrymate.moncalendrierdelavent";

    return (
        <ImageBackground
            source={{ uri: getCloudinaryImageUrl("17_mz6l5c") }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <ThemedText style={styles.text}>
                    Pour profiter pleinement de ce que les lutins ont préparé
                    ces derniers jours, veuillez mettre l’application à jour ✨
                </ThemedText>

                <Pressable
                    onPress={() => Linking.openURL(storeUrl)}
                    style={styles.button}
                >
                    <ThemedText style={styles.buttonText}>
                        Mettre à jour
                    </ThemedText>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        margin: 20,
        gap: 16,
        position: "absolute",
        top: "18%",
    },
    text: {
        color: Colors.snow,
        textAlign: "center",
        fontSize: 20,
    },
    button: {
        height: 48,
        paddingHorizontal: 28,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: Colors.snow,
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        color: Colors.blue,
    },
});
