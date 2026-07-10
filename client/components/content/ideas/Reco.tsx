import { StyleSheet, View, Image } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
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
                (idea.content4 == IdeaType.Game ? (
                    <View style={{ alignItems: "center", marginVertical: 10 }}>
                        <Image
                            source={{
                                uri: getCloudinaryImageUrl(idea.media ?? ""),
                            }}
                            style={[{ width: 350 }, { height: 280 }]}
                            resizeMode="cover"
                        />
                    </View>
                ) : (
                    <ExternalLink
                        href={idea.content4 as Href}
                        style={styles.button}
                    >
                        <ThemedText style={styles.buttonText}>
                            {idea.content3}
                        </ThemedText>
                    </ExternalLink>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.green,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        alignSelf: "center",
        textAlign: "center",
    },
    buttonText: { color: "white", lineHeight: 48 },
});
