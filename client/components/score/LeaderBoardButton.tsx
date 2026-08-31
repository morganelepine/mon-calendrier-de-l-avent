import { StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";

interface LeaderBoardButtonProps {
    onPress: () => void;
    text: string;
    loadingMore?: boolean;
}

export const LeaderBoardButton = ({
    onPress,
    text,
    loadingMore,
}: LeaderBoardButtonProps) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
            disabled={loadingMore}
        >
            {loadingMore ? (
                <ActivityIndicator color={Colors.snow} />
            ) : (
                <ThemedText style={styles.buttonText}>{text}</ThemedText>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Theme.autumnGreen,
        borderWidth: 1,
        borderColor: Colors.snow,
        borderRadius: 50,
        alignSelf: "center",
        paddingVertical: 6,
        paddingHorizontal: 24,
        marginTop: 20,
    },
    buttonText: {
        color: Colors.snow,
        fontSize: 14,
    },
});
