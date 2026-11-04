import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { ListOfContents } from "@/interfaces/contentInterface";

export const ListVideo = (content: ListOfContents) => {
    return (
        <>
            <ThemedText style={styles.title}>{content.title}</ThemedText>

            {content.author && (
                <ThemedText style={styles.author}>{content.author}</ThemedText>
            )}

            {content.url && (
                <View style={styles.videoContainer}>
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
    },
    author: {
        fontStyle: "italic",
        fontSize: 14,
        marginTop: -6,
    },
    videoContainer: {
        marginTop: 20,
    },
    description: { fontSize: 15 },
});
