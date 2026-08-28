import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { showToast } from "@/components/utils/Toast";

interface StoryProps {
    story: Content;
    dayId: number;
}

export const Story: React.FC<StoryProps> = ({ story, dayId }) => {
    useEffect(() => {
        if (story?.dayNumber === 13 || story?.dayNumber === 19) {
            showToast("Une nouvelle histoire commence !", "long");
        }
    }, [story.dayNumber]);

    return (
        <ContentScreenWrapper
            contentType={story.type}
            backgroundImage={"s-instruire_xybqas"}
            dayId={dayId}
        >
            <ThemedText type="contentSubtitle">{story.title}</ThemedText>

            {story.content1 ? (
                <CustomMarkdown style={{ fontFamily: "PoppinsItalic" }}>
                    {story.content1}
                </CustomMarkdown>
            ) : null}

            <CustomMarkdown>{story.content2}</CustomMarkdown>

            <ThemedText style={styles.end}>
                {story.content3 === "end" ? "The end" : "La suite demain..."}
            </ThemedText>
        </ContentScreenWrapper>
    );
};

const styles = StyleSheet.create({
    end: {
        paddingTop: 10,
        fontFamily: "PoppinsItalic",
        color: Colors.green,
    },
});
