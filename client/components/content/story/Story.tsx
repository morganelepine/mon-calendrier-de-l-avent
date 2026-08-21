import { useEffect } from "react";
import { StyleSheet, Platform, ToastAndroid } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";

interface StoryProps {
    story: Content;
    dayId: number;
}

export const Story: React.FC<StoryProps> = ({ story, dayId }) => {
    useEffect(() => {
        // ToastAndroid is Android-only — undefined on web/iOS, so it would
        // throw there without this guard.
        if (
            Platform.OS === "android" &&
            (story?.dayNumber === 13 || story?.dayNumber === 19)
        ) {
            ToastAndroid.show(
                "Une nouvelle histoire commence !",
                ToastAndroid.LONG,
            );
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
