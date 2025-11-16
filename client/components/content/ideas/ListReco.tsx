import { StyleSheet, View, Image } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { Colors } from "@/constants/Colors";
import { ListOfContents } from "@/interfaces/contentInterface";
import { IdeaType } from "@/enums/enums";

interface ListRecoProps {
    type: string | undefined;
    content: ListOfContents;
    imageWidth: number;
    imageHeight: number;
}

export const ListReco: React.FC<ListRecoProps> = ({
    type,
    content,
    imageWidth,
    imageHeight,
}) => {
    return (
        <>
            <CustomMarkdown style={styles.title}>
                {content.title}
            </CustomMarkdown>

            {content.author &&
                (type === IdeaType.Book || type === IdeaType.TvShow) && (
                    <ThemedText style={styles.where}>
                        {type === IdeaType.Book ? "De " : "À regarder sur "}
                        {content.author}
                    </ThemedText>
                )}

            <View style={{ flexDirection: "row" }}>
                {/* IMAGE */}
                {content.image && (
                    <View style={{ marginVertical: 10 }}>
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(content.image),
                            }}
                            style={{
                                borderRadius: 8,
                                width: imageWidth || 150,
                                height: imageHeight || 150,
                            }}
                            resizeMode="cover"
                        />
                        {content.url && (
                            <ExternalLink
                                href={content.url as Href}
                                style={styles.link}
                            />
                        )}
                    </View>
                )}

                {/* SUMMARY */}
                <View style={{ flex: 1, paddingLeft: 15 }}>
                    <ThemedText style={styles.description}>
                        {content.author ? content.description : null}
                        {content.url && (
                            <ExternalLink href={content.url as Href}>
                                <ThemedText
                                    style={[
                                        styles.description,
                                        {
                                            textDecorationLine: "underline",
                                        },
                                    ]}
                                >
                                    {content.author
                                        ? content.author
                                        : content.description}
                                </ThemedText>
                            </ExternalLink>
                        )}
                    </ThemedText>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
        color: Colors.green,
    },
    where: {
        fontStyle: "italic",
        fontSize: 14,
        marginTop: -12,
        marginBottom: 10,
    },
    description: { textAlign: "left", fontSize: 15, marginBottom: 20 },
    link: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});
