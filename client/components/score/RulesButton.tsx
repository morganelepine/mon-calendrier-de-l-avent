import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface RulesButtonProps {
    setModalVisible: (modalVisible: boolean) => void;
}

export const RulesButton: React.FC<RulesButtonProps> = ({
    setModalVisible,
}) => {
    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.button}
            >
                <ThemedText style={styles.buttonText}>
                    Voir les règles
                </ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 40,
        paddingHorizontal: 20,
        width: "100%",
    },
    button: {
        height: 48,
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.red,
        fontSize: 14,
        fontFamily: "PoppinsItalic",
        textDecorationLine: "underline",
    },
});
