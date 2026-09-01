import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

export function Separator() {
    return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    separator: {
        borderTopWidth: 1,
        borderTopColor: Colors.disabled,
        marginVertical: 16,
    },
});
