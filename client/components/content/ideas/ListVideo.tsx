import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { ListOfContents } from "@/interfaces/contentInterface";

export const ListVideo = (content: ListOfContents) => {
    return (
        <>
            <View style={styles.video}>
                <Video videoId={content.url} />
            </View>

            <ThemedText style={styles.title}>{content.title}</ThemedText>

            <ThemedText style={styles.description}>
                {content.description}
            </ThemedText>
        </>
    );
};

const styles = StyleSheet.create({
    video: { marginTop: 20 },
    title: {
        fontFamily: "PoppinsBold",
        textAlign: "left",
    },
    description: { textAlign: "left", fontSize: 15 },
});
