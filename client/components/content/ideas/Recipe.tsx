import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";

interface RecipeProps {
    content: Content;
}

export const Recipe: React.FC<RecipeProps> = ({ content }) => {
    return (
        <View>
            <ThemedText type="contentSubtitle">{content.title}</ThemedText>

            <View>
                <ThemedText style={styles.subtitle}>Ingrédients</ThemedText>
                <CustomMarkdown style={styles.ingredients} compactList>
                    {content.content2}
                </CustomMarkdown>
            </View>

            <View style={{ marginTop: 10 }}>
                <ThemedText style={styles.subtitle}>Recette</ThemedText>
                <CustomMarkdown>{content.content1}</CustomMarkdown>
            </View>

            {content.content3 ? (
                <CustomMarkdown style={styles.sourcePhoto}>
                    {content.content3}
                </CustomMarkdown>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        fontFamily: "FreightNeoBold",
        marginBottom: 10,
        fontSize: 20,
        color: Colors.autumnGreen,
    },
    ingredients: {
        marginBottom: 5,
        fontSize: 16,
        textAlign: "left",
    },
    sourcePhoto: {
        fontSize: 10,
        fontFamily: "PoppinsItalic",
        alignSelf: "flex-end",
        marginTop: 10,
    },
});
