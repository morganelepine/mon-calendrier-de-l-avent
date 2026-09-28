import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLinkButton } from "@/components/utils/buttons/ExternalLinkButton";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { IdeaType } from "@/enums/enums";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";

interface RecoProps {
    idea: Content;
}

export const Reco: React.FC<RecoProps> = ({ idea }) => {
    return (
        <View>
            <ThemedText type="contentSubtitle">{idea.title}</ThemedText>

            <CustomMarkdown style={{ color: Colors.green }}>
                {idea.content1}
            </CustomMarkdown>

            <CustomMarkdown>{idea.content2}</CustomMarkdown>

            {/* IMAGE OR BUTTON */}
            {idea.media &&
                (idea.content4 === IdeaType.Game ? (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(idea.media ?? ""),
                            }}
                            style={styles.image}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        />
                    </View>
                ) : (
                    <ExternalLinkButton url={idea.media}>
                        {idea.content3}
                    </ExternalLinkButton>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
    image: {
        width: 350,
        height: 280,
    },
});
