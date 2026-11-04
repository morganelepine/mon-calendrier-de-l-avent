import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { Theme } from "@/constants/Colors";
import { ListOfContents } from "@/interfaces/contentInterface";

interface ListRecoProps {
    content: ListOfContents;
    imageWidth: number | undefined;
    imageHeight: number | undefined;
}

export const ListReco: React.FC<ListRecoProps> = ({
    content,
    imageWidth,
    imageHeight,
}) => {
    return (
        <View>
            <ThemedText
                style={{
                    ...styles.title,
                    textDecorationLine: content.url ? "underline" : "none",
                }}
            >
                {content.title}
            </ThemedText>

            {content.author && (
                <ThemedText style={styles.author}>{content.author}</ThemedText>
            )}

            <View style={{ flexDirection: "row" }}>
                {content.image && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(content.image),
                            }}
                            style={{
                                borderRadius: 8,
                                width: imageWidth || 150,
                                height: imageHeight || 150,
                            }}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        />
                    </View>
                )}

                {content.description && (
                    <View style={{ flex: 1 }}>
                        <ThemedText style={styles.description}>
                            {content.description}
                        </ThemedText>
                    </View>
                )}
            </View>

            {/* Overlay rather than a wrapper: Link renders a Text, and asChild
                would drop target="_blank" on the PWA. */}
            {content.url && (
                <ExternalLink
                    href={content.url as Href}
                    style={styles.link}
                    accessibilityLabel={`Ouvrir ${content.title}`}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
        color: Theme.orangeToGreen,
    },
    author: {
        fontStyle: "italic",
        fontSize: 14,
        marginTop: -4,
        marginBottom: 10,
    },
    imageContainer: {
        marginVertical: 10,
        paddingRight: 15,
    },
    description: { fontSize: 15 },
    link: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});
