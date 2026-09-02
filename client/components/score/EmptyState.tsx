import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface EmptyStateProps {
    children: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>{children}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    text: {
        color: Colors.snow,
        textAlign: "center",
    },
});
