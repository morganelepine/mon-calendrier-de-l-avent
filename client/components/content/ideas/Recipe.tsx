import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";

interface RecipeProps {
    content: {
        dayNumber: number;
        type: string;
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
        content5: string;
    };
}

export const Recipe: React.FC<RecipeProps> = ({ content }) => {
    return (
        <View>
            <ThemedText type="modalSubtitle" style={styles.recipeTitle}>
                {content.title}
            </ThemedText>

            <View style={styles.contentContainer}>
                <ThemedText style={styles.contentTitle}>Ingrédients</ThemedText>
                <CustomMarkdown style={styles.ingredients}>
                    {content.content2}
                </CustomMarkdown>
            </View>

            <View style={styles.contentContainer}>
                <ThemedText style={styles.contentTitle}>Recette</ThemedText>
                <ThemedText style={styles.recipe}>
                    {content.content1}
                </ThemedText>
            </View>

            {content.content4 ? (
                <CustomMarkdown style={styles.sourcePhoto}>
                    {content.content4}
                </CustomMarkdown>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    recipe: {
        textAlign: "left",
    },
    contentContainer: { textAlign: "left", marginBottom: 20 },
    contentTitle: {
        fontFamily: "PallyBold",
        textAlign: "left",
        marginBottom: 10,
        fontSize: 20,
        color: Colors.green,
    },
    recipeTitle: { fontSize: 24, marginBottom: 20 },
    ingredients: {
        marginBottom: 5,
        fontSize: 16,
        textAlign: "left",
    },
    sourcePhoto: {
        fontSize: 10,
        fontFamily: "AnonymousProItalic",
        alignSelf: "flex-end",
    },
});
