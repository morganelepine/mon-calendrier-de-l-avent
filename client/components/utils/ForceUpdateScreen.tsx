import { StyleSheet, Linking, View } from "react-native";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function ForceUpdateScreen() {
    const storeUrl =
        "https://play.google.com/store/apps/details?id=com.merrymate.moncalendrierdelavent";

    return (
        <BackgroundImage image="17_mz6l5c">
            <View style={styles.container}>
                <ThemedText style={styles.text}>
                    Pour profiter pleinement de ce que les lutins ont préparé
                    ces derniers jours, veuillez mettre l’application à jour ✨
                </ThemedText>

                <CustomButton
                    onPress={() => Linking.openURL(storeUrl)}
                    color={Colors.snow}
                    textColor={Colors.blue}
                >
                    Mettre à jour
                </CustomButton>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        gap: 16,
        position: "absolute",
        top: "22%",
    },
    text: {
        color: Colors.snow,
        textAlign: "center",
    },
});
