import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const OffSeason = () => {
    return (
        <View style={styles.offSeasonContainer}>
            <ThemedText style={styles.offSeasonText}>
                Rendez-vous le 1er décembre pour découvrir le classement !
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    offSeasonContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    offSeasonText: {
        color: Colors.snow,
        textAlign: "center",
    },
});
