import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    ImageBackground,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { Content } from "@/interfaces/contentInterface";

interface ArticleProps {
    story: Content;
}

export const Article: React.FC<ArticleProps> = ({ story }) => {
    return (
        <ImageBackground
            source={{
                uri: getCloudinaryImageUrl("newspaper_4_ofarnv"),
            }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <ScrollView contentContainerStyle={styles.articleContainer}>
                <CustomSafeAreaView>
                    <ThemedText style={styles.headline}>Daily news</ThemedText>

                    <ThemedText style={styles.title}>{story.title}</ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Par Ronan Barvel
                    </ThemedText>

                    <View style={styles.separator} />

                    {story.image && (
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(story.image),
                            }}
                            style={styles.articleImage}
                            resizeMode="cover"
                        />
                    )}

                    <CustomMarkdown style={styles.articleText}>
                        {story.content2}
                    </CustomMarkdown>
                </CustomSafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        backgroundColor: Colors.darkGreen,
        flex: 1,
        width: "100%",
        height: "100%",
    },
    articleContainer: {
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 40,
    },
    headline: {
        fontFamily: "PallyBold",
        fontSize: 44,
        textAlign: "center",
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 12,
        color: Colors.blue,
    },
    title: {
        fontFamily: "PoppinsBold",
        fontSize: 20,
        textAlign: "center",
        color: Colors.darkBlue,
    },
    subtitle: {
        fontFamily: "PoppinsItalic",
        textAlign: "center",
        fontSize: 14,
        color: Colors.disabledText,
    },
    separator: {
        borderBottomColor: Colors.darkBlue,
        borderBottomWidth: 1,
        marginVertical: 20,
        width: "70%",
        alignSelf: "center",
    },
    articleImage: {
        width: "100%",
        height: 180,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 15,
    },
    articleText: {
        fontFamily: "Georgia",
        fontSize: 16,
        lineHeight: 26,
        textAlign: "justify",
        color: Colors.darkBlue,
    },
});
