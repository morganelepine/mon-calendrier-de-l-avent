import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { ListOfContents } from "@/interfaces/contentInterface";

export const ListVideo = (content: ListOfContents) => {
    return (
        <>
            <ThemedText
                style={[
                    styles.title,
                    { marginBottom: content.author ? 0 : 20 },
                ]}
            >
                {content.title}
            </ThemedText>

            {content.author && (
                <ThemedText style={styles.where}>
                    À regarder sur {content.author}
                </ThemedText>
            )}

            {content.url && (
                <View>
                    <Video videoId={content.url} />
                </View>
            )}

            <ThemedText style={styles.description}>
                {content.description}
            </ThemedText>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PoppinsBold",
        textAlign: "left",
    },
    where: {
        fontStyle: "italic",
        fontSize: 14,
        marginTop: -6,
        marginBottom: 20,
    },
    description: { textAlign: "left", fontSize: 15 },
});
