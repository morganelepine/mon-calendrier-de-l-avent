import { StyleSheet, View, Image } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/utils/ExternalLink";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { Colors } from "@/constants/Colors";

interface ListRecoProps {
    content: {
        id: number;
        title: string;
        image?: string;
        description?: string;
        author?: string;
        link?: string;
    };
}

export const ListReco: React.FC<ListRecoProps> = ({ content }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{ marginVertical: 10 }}>
                <Image
                    source={{
                        uri: getCloudinaryImageUrl(content.image),
                    }}
                    style={styles.image}
                />
                <ExternalLink href={content.link as Href} style={styles.link} />
            </View>

            <View style={{ flex: 1, paddingLeft: 15 }}>
                <ThemedText style={styles.title}>{content.title}</ThemedText>

                <ThemedText style={styles.description}>
                    {content.author ? content.description : null}
                    <ExternalLink href={content.link as Href}>
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
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
        color: Colors.green,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    description: { textAlign: "left", fontSize: 15, marginBottom: 20 },
    link: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
});
