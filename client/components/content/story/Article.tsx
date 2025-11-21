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
                    <ThemedText style={styles.headline}>
                        Énisor actus
                    </ThemedText>

                    <ThemedText style={styles.title}>{story.title}</ThemedText>

                    <ThemedText style={styles.subtitle}>
                        Par Ronan Barvel
                    </ThemedText>

                    <ThemedText style={styles.chapo}>
                        {story.content1}
                    </ThemedText>

                    {story.content4 && (
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(story.content4),
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
        paddingTop: 24,
        paddingBottom: 32,
        paddingHorizontal: 40,
    },
    headline: {
        fontFamily: "PallyBold",
        fontSize: 38,
        textAlign: "center",
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 12,
        color: Colors.darkBlue,
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
    articleImage: {
        width: "100%",
        height: 180,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 20,
    },
    chapo: {
        fontFamily: "PoppinsItalic",
        color: Colors.darkBlue,
        textAlign: "left",
        fontSize: 16,
        marginVertical: 20,
    },
    articleText: {
        color: Colors.darkBlue,
    },
});
