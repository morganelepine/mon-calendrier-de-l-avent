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
            <ThemedText type="contentSubtitle" style={styles.recipeTitle}>
                {content.title}
            </ThemedText>

            <View>
                <ThemedText style={styles.contentTitle}>Ingrédients</ThemedText>
                <CustomMarkdown style={styles.ingredients}>
                    {content.content2}
                </CustomMarkdown>
            </View>

            <View style={{ marginTop: 10 }}>
                <ThemedText style={styles.contentTitle}>Recette</ThemedText>
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
    contentTitle: {
        fontFamily: "PallyBold",
        textAlign: "left",
        marginBottom: 10,
        fontSize: 20,
        color: Colors.green,
    },
    recipeTitle: { fontSize: 20, marginBottom: 20 },
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
