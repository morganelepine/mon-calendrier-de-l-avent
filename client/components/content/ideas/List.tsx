import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ListVideo } from "@/components/content/ideas/ListVideo";
import { ListReco } from "@/components/content/ideas/ListReco";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { IdeaType } from "@/enums/enums";

interface SubContent {
    id: number;
    title: string;
    image?: string;
    description?: string;
    author?: string;
    link?: string;
    url?: string;
}

interface ListProps {
    idea: {
        id: number;
        title: string;
        content1: string;
        content4: string;
        content5: string;
        listOfContents: SubContent[];
    };
}

export const List: React.FC<ListProps> = ({ idea }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const current = idea.listOfContents[selectedIndex];

    return (
        <View>
            <ThemedText type="contentSubtitle">{idea.title}</ThemedText>

            {idea.content1 ? (
                <CustomMarkdown>{idea.content1}</CustomMarkdown>
            ) : null}

            {/* --- BUTTONS --- */}

            <View style={styles.buttonRow}>
                {idea.listOfContents.map((item, index) => (
                    <Pressable
                        key={item.id}
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
                            {`Idée ${index + 1}`}
                        </ThemedText>
                    </Pressable>
                ))}
            </View>

            {/* --- CONTENT --- */}
            {idea.content4 === IdeaType.Video ? (
                <ListVideo content={current} />
            ) : (
                <ListReco content={current} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginVertical: 20,
        gap: 8,
    },
    switchButton: {
        borderColor: Colors.green,
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 12,
    },
    switchButtonActive: {
        backgroundColor: Colors.green,
    },
    switchButtonText: {
        color: Colors.green,
    },
    switchButtonTextActive: {
        color: "white",
        fontFamily: "PoppinsBold",
    },
});
