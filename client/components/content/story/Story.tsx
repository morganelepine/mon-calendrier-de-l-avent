import { useEffect } from "react";
import { StyleSheet, Pressable, ToastAndroid } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ContentScreenWrapper } from "@/components/utils/custom/ContentScreenWrapper";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { Content } from "@/interfaces/contentInterface";

interface StoryProps {
    story: Content;
    dayId: number;
}

export const Story: React.FC<StoryProps> = ({ story, dayId }) => {
    useEffect(() => {
        if (story?.dayNumber === 13 || story?.dayNumber === 19) {
            ToastAndroid.show(
                "Une nouvelle histoire commence !",
                ToastAndroid.LONG
            );
        }
    }, [story.dayNumber]);

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

            <ThemedText style={styles.end}>
                {story.content5 == "end" ? "The end" : "La suite demain..."}
            </ThemedText>

            <Pressable
                onPress={() =>
                    router.push(
                        `/calendar/day/${String(dayId)}/content/story/storygame`
                    )
                }
                style={styles.button}
            >
                <ThemedText style={styles.buttonText}>
                    J'ai trouvé la solution du jeu !
                </ThemedText>
            </Pressable>
        </ContentScreenWrapper>
    );
};

const styles = StyleSheet.create({
    end: {
        paddingTop: 10,
        fontFamily: "PoppinsItalic",
        color: Colors.green,
    },
    button: { marginTop: 28, marginBottom: 8 },
    buttonText: {
        textDecorationLine: "underline",
        color: Colors.green,
        textAlign: "right",
        fontSize: 14,
    },
});
