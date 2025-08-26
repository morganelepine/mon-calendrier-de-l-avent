import { StyleSheet, View, Image } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Video } from "@/components/utils/custom/Video";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { IdeaType } from "@/enums/enums";

import { getCloudinaryImageUrl } from "@/services/cloudinary";

interface RecoProps {
    idea: Content;
    imageWidth: number;
    imageHeight: number;
}

export const Reco: React.FC<RecoProps> = ({
    idea,
    imageWidth,
    imageHeight,
}) => {
    return (
        <View>
            <ThemedText type="contentSubtitle" style={{ marginBottom: 20 }}>
                {idea.title}
            </ThemedText>

            {idea.content5 === IdeaType.Book ? (
                <View style={styles.bookContainer}>
                    <Image
                        source={{
                            uri: getCloudinaryImageUrl(idea.image ?? ""),
                        }}
                        style={[
                            styles.bookCover,
                            { width: imageWidth },
                            { height: imageHeight },
                        ]}
                        resizeMode="cover"
                    />
                    <View style={styles.bookInfos}>
                        <CustomMarkdown style={styles.bookTitle}>
                            {idea.content1}
                        </CustomMarkdown>
                        <ThemedText style={styles.author}>
                            de {idea.content3}
                        </ThemedText>
                    </View>
                </View>
            ) : (
                <CustomMarkdown
                    style={{ fontFamily: "PoppinsBold", color: Colors.green }}
                >
                    {idea.content1}
                </CustomMarkdown>
            )}

            {idea.content5 === IdeaType.TvShow ? (
                <View style={styles.video}>
                    <Video videoId={idea.content4} />
                </View>
            ) : null}

            <CustomMarkdown>{idea.content2}</CustomMarkdown>

            {idea.content5 === IdeaType.Idea && idea.content4 ? (
                <ExternalLink
                    href={idea.content4 as Href}
                    style={styles.button}
                >
                    <ThemedText style={styles.buttonText}>
                        {idea.content3}
                    </ThemedText>
                </ExternalLink>
            ) : null}

            {idea.image && idea.content5 !== IdeaType.Book ? (
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <Image
                        source={{
                            uri: getCloudinaryImageUrl(idea.image ?? ""),
                        }}
                        style={[{ width: imageWidth }, { height: imageHeight }]}
                        resizeMode="cover"
                    />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    bookInfos: { paddingLeft: 15, flex: 1 },
    bookTitle: {
        marginTop: -15,
        fontFamily: "PoppinsBold",
    },
    author: {
        marginTop: -10,
        marginBottom: 15,
        fontSize: 12,
        fontFamily: "PoppinsItalic",
        textAlign: "left",
    },
    bookCover: {
        borderColor: Colors.green,
        borderWidth: 0.2,
        marginBottom: 20,
    },
    headerImage: {
        width: "100%",
        height: 200,
    },

    button: {
        backgroundColor: Colors.green,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 20,
        height: 48,
        justifyContent: "center",
        textAlign: "center",
    },
    buttonText: { color: "white", lineHeight: 48 },

    videoTitle: { fontFamily: "PoppinsBold", fontSize: 18, marginBottom: -5 },
    video: { marginTop: 10 },
});
