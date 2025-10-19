import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { getContentsByDay } from "@/services/content.service";

export default function StoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = parseInt(id, 10);

    const { story } = getContentsByDay(dayId);

    return (
        <ContentScreenWrapper
            contentType={story.type}
            backgroundImage={getCloudinaryImageUrl("s-instruire_xybqas")}
            dayId={dayId}
        >
            <ThemedText type="contentSubtitle">{story.title}</ThemedText>

            {story.content1 ? (
                <CustomMarkdown style={{ fontFamily: "PoppinsItalic" }}>
                    {story.content1}
                </CustomMarkdown>
            ) : null}

            <CustomMarkdown>{story.content2}</CustomMarkdown>

            {story.dayNumber < 24 && (
                <ThemedText style={styles.end}>La suite demain...</ThemedText>
            )}
        </ContentScreenWrapper>
    );
}

const styles = StyleSheet.create({
    end: {
        paddingTop: 10,
        fontFamily: "PoppinsItalic",
        color: Colors.green,
    },
});
