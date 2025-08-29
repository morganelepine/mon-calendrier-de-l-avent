import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

interface ScoresButtonProps {
    setModalVisible: (modalVisible: boolean) => void;
}

export const ScoresButton: React.FC<ScoresButtonProps> = ({
    setModalVisible,
}) => {
    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.button}
            >
                <ThemedText type="italic14" style={styles.buttonText}>
                    Voir les règles
                </ThemedText>
            </Pressable>

            <Pressable
                onPress={() => router.navigate("/scores/leaderboard")}
                style={styles.button}
            >
                <ThemedText type="italic14" style={styles.buttonText}>
                    Voir le classement
                </ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        width: "100%",
        gap: 16,
    },
    button: {
        height: 48,
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.snow,
        textDecorationLine: "underline",
    },
});
