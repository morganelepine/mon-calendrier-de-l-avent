import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";

interface ListVideoProps {
    content: {
        id: number;
        title: string;
        description?: string;
        url?: string;
    };
}

export const ListVideo: React.FC<ListVideoProps> = ({ content }) => {
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
