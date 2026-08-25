import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";

type NoContentProps = {
    loadContents: () => void;
};

export const NoContent = ({ loadContents }: NoContentProps) => {
    return (
        <View
            style={styles.errorContainer}
            accessibilityLabel="Le contenu n'a pas pu être chargé"
        >
            <ThemedText style={styles.errorTitle} accessibilityRole="alert">
                Oops, les contenus du jour n'ont pas pu être chargés...
            </ThemedText>
            <ThemedText style={styles.errorMessage}>
                Vérifiez votre connexion et réessayez.
            </ThemedText>
            <CustomButton onPress={loadContents}>Réessayer</CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        gap: 12,
        backgroundColor: Colors.blue,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.snow,
    },
    errorMessage: {
        fontSize: 14,
        textAlign: "center",
        color: Colors.snow,
    },
});
