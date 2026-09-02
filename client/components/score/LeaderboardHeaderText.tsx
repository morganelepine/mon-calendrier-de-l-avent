import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface LeaderboardHeaderTextProps {
    children: React.ReactNode;
}

export const LeaderboardHeaderText: React.FC<LeaderboardHeaderTextProps> = ({
    children,
}) => {
    return <ThemedText style={styles.text}>{children}</ThemedText>;
};

const styles = StyleSheet.create({
    text: {
        color: Colors.snow,
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 16,
    },
});
