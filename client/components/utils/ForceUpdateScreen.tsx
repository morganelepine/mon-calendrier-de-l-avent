import { StyleSheet, Linking, View } from "react-native";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { PLAY_STORE_URL } from "@/constants/Links";

export default function ForceUpdateScreen() {
    return (
        <BackgroundImage image="17_mz6l5c">
            <View style={styles.container}>
                <ThemedText style={styles.text}>
                    Pour profiter pleinement de ce que les lutins ont préparé
                    ces derniers jours, veuillez mettre l’application à jour ✨
                </ThemedText>

                <CustomButton
                    onPress={() => Linking.openURL(PLAY_STORE_URL)}
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
