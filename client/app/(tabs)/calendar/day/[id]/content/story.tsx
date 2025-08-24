import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { getContentsByDay } from "@/services/content.service";

export default function StoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { story } = getContentsByDay(dayId);

    return (
        <ModalWithText
            contentType={story.type}
            backgroundImage={getCloudinaryImageUrl("s-instruire_xybqas")}
        >
            <CustomScrollView>
                <ThemedText type="modalSubtitle">{story.title}</ThemedText>

                {story.content1 ? (
                    <CustomMarkdown style={styles.subtitle}>
                        {story.content1}
                    </CustomMarkdown>
                ) : null}

                <CustomMarkdown style={styles.text}>
                    {story.content2}
                </CustomMarkdown>

                {story.dayNumber < 24 && (
                    <ThemedText style={styles.end}>
                        La suite demain...
                    </ThemedText>
                )}
            </CustomScrollView>
        </ModalWithText>
    );
}

const styles = StyleSheet.create({
    subtitle: { fontFamily: "PoppinsItalic", textAlign: "left", marginTop: -5 },
    text: {
        textAlign: "left",
    },
    end: {
        paddingVertical: 20,
        fontSize: 14,
        fontFamily: "PoppinsItalic",
        color: Colors.green,
    },
});
