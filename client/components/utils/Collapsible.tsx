import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export function Collapsible({
    children,
    style = {},
    title,
}: PropsWithChildren & { style?: TextStyle; title: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={isOpen ? "chevron-down" : "chevron-forward-outline"}
                    size={18}
                    color={Colors.red}
                />
                <ThemedText style={{ ...styles.title, ...style }}>
                    {title}
                </ThemedText>
            </TouchableOpacity>
            {isOpen && <View style={styles.content}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        height: 48,
    },
    title: { fontFamily: "PoppinsBold", textAlign: "left", fontSize: 16 },
    content: {
        marginTop: 6,
        marginLeft: 25,
    },
});
