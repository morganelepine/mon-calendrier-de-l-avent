import {
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";

export interface PillTabBarItem {
    key: string;
    label: string;
}

interface PillTabBarProps {
    items: readonly PillTabBarItem[];
    activeKey: string;
    onSelect: (key: string) => void;
    variant?: "filled" | "outline";
    withBackgroundStrip?: boolean;
}

export const PillTabBar: React.FC<PillTabBarProps> = ({
    items,
    activeKey,
    onSelect,
    variant = "filled",
    withBackgroundStrip = false,
}) => {
    const isFilled = variant === "filled";

    const content = (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {items.map((item) => {
                const focused = item.key === activeKey;
                return (
                    <Pressable
                        key={item.key}
                        onPress={() => onSelect(item.key)}
                        style={[
                            isFilled ? styles.pillFilled : styles.pillOutline,
                            focused &&
                                (isFilled
                                    ? styles.pillFilledActive
                                    : styles.pillOutlineActive),
                        ]}
                    >
                        <ThemedText
                            style={[
                                isFilled
                                    ? styles.labelFilled
                                    : styles.labelOutline,
                                focused && styles.labelActive,
                            ]}
                        >
                            {item.label}
                        </ThemedText>
                    </Pressable>
                );
            })}
        </ScrollView>
    );

    return withBackgroundStrip ? (
        <View style={styles.wrapper}>{content}</View>
    ) : (
        content
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Theme.surface,
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 8,
    },
    pillFilled: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.snow,
        backgroundColor: Colors.snow,
        opacity: 0.8,
        borderRadius: 50,
        marginTop: Platform.OS === "web" ? 6 : 0,
        paddingVertical: Platform.OS === "web" ? 8 : 4,
        paddingHorizontal: Platform.OS === "web" ? 16 : 12,
    },
    pillFilledActive: {
        backgroundColor: Theme.green,
        opacity: 1,
    },
    labelFilled: {
        color: Theme.tint,
        textAlign: "center",
        fontSize: 14,
    },
    pillOutline: {
        borderWidth: 1,
        borderColor: Colors.snow,
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    pillOutlineActive: {
        backgroundColor: Theme.autumnGreen,
    },
    labelOutline: {
        fontSize: 13,
        color: Colors.snow,
    },
    labelActive: {
        color: Colors.snow,
        fontFamily: "PoppinsBold",
    },
});
