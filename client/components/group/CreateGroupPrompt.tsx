import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

// Shared "you don't have a group yet" content.
// Used inside the entry-point modal (NoGroupModal)
// and inline on the group screen (NoGroup).
export const CreateGroupPrompt = ({
    onPress,
    textColor = Colors.snow,
}: {
    onPress: () => void;
    textColor?: string;
}) => (
    <>
        <ThemedText style={[styles.text, { color: textColor }]}>
            Vous n'avez pas encore de groupe. Créez-en un pour retrouver plus
            facilement les scores de vos ami·e·s&nbsp;!
        </ThemedText>
        <Pressable style={styles.button} onPress={onPress}>
            <ThemedText style={{ color: Colors.snow }}>
                Créer mon groupe
            </ThemedText>
        </Pressable>
    </>
);

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
    },
    button: {
        backgroundColor: Colors.green,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 24,
        alignSelf: "center",
    },
});
