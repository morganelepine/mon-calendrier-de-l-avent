import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Theme, Colors } from "@/constants/Colors";
import { CustomButton } from "@/components/utils/buttons/Button";

interface ErrorLoadingProps {
    loading: boolean;
    error: string | null;
    refreshScores: () => void;
}

export const ErrorLoading = ({
    loading,
    error,
    refreshScores,
}: ErrorLoadingProps) => {
    if (error) {
        return (
            <View style={styles.container}>
                <ThemedText style={styles.text}>{error}</ThemedText>
                <CustomButton onPress={refreshScores} color={Theme.autumnGreen}>
                    Réessayer
                </CustomButton>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.snow} />
                <ThemedText style={styles.text}>
                    Chargement des scores
                </ThemedText>
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        marginBottom: 32,
    },
    text: {
        color: Colors.snow,
        fontFamily: "PoppinsItalic",
        textAlign: "center",
    },
});
