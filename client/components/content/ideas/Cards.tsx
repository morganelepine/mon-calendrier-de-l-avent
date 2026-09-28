import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Theme } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { parseCards } from "@/services/cards.service";

interface CardsProps {
    idea: Content;
}

export const Cards: React.FC<CardsProps> = ({ idea }) => {
    const cards = useMemo(() => parseCards(idea.content1), [idea.content1]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!cards) return null;

    const titleOf = (item: Record<string, string>) =>
        String(Object.values(item)[0] ?? "");
    const current = cards.items[selectedIndex];
    const fields = Object.entries(current).slice(1);

    return (
        <View>
            <ThemedText type="contentSubtitle">{idea.title}</ThemedText>

            {cards.description ? (
                <CustomMarkdown>{cards.description}</CustomMarkdown>
            ) : null}

            {/* --- BUTTONS --- */}
            <View style={styles.buttonRow}>
                {cards.items.map((item, index) => (
                    <Pressable
                        key={index}
                        style={[
                            styles.switchButton,
                            selectedIndex === index &&
                                styles.switchButtonActive,
                        ]}
                        onPress={() => setSelectedIndex(index)}
                    >
                        <ThemedText
                            style={[
                                styles.switchButtonText,
                                selectedIndex === index &&
                                    styles.switchButtonTextActive,
                            ]}
                        >
                            {titleOf(item)}
                        </ThemedText>
                    </Pressable>
                ))}
            </View>

            {/* --- CARD --- */}
            <ThemedText type="contentSubtitle">{titleOf(current)}</ThemedText>
            {fields.map(([key, value]) => (
                <View key={key} style={styles.field}>
                    <ThemedText style={styles.label}>
                        {cards.labels?.[key] ?? key}
                    </ThemedText>
                    <CustomMarkdown>{String(value)}</CustomMarkdown>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginVertical: 8,
        marginBottom: 24,
        gap: 8,
    },
    switchButton: {
        borderColor: Theme.orangeToGreen,
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 12,
        minHeight: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    switchButtonActive: {
        backgroundColor: Theme.orangeToGreen,
    },
    switchButtonText: {
        color: Theme.orangeToGreen,
        fontSize: 14,
    },
    switchButtonTextActive: {
        color: "white",
        fontFamily: "PoppinsBold",
    },
    field: {
        marginTop: 8,
    },
    label: {
        color: Theme.autumnGreenDarkToautumnGreen,
        fontFamily: "PoppinsBold",
        fontSize: 14,
    },
});
