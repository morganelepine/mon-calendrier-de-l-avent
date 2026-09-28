import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

export function OptionItem({
    title,
    iconName,
    iconColor,
    onPress,
}: Readonly<{
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    onPress: () => void;
}>) {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View
                style={[styles.iconContainer, { backgroundColor: iconColor }]}
            >
                <Ionicons name={iconName} size={20} color="#fff" />
            </View>

            <ThemedText style={styles.title}>{title}</ThemedText>

            <Ionicons name="chevron-forward" size={20} color="#aaa" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.snow,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    title: {
        flex: 1,
        fontSize: 14,
    },
});
