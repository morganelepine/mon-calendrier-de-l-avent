import { StyleSheet, Pressable, ImageBackground } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { updateScores } from "@/services/score.service";
import { getContentTitle } from "@/services/content.service";
import { Content } from "@/interfaces/contentInterface";
import { ScoreType } from "@/enums/enums";

interface ContentButtonProps {
    content?: Content;
    ideas?: Content[];
    games?: Content[];
    dayId: number;
    backgroundImage: string;
    contentType: "story" | "idea" | "anecdote" | "game";
}

export const ContentButton: React.FC<ContentButtonProps> = ({
    content = {
        id: 0,
        dayNumber: 0,
        type: "quote",
        title: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content5: "",
    },
    ideas = [],
    games = [],
    dayId,
    backgroundImage,
    contentType,
}) => {
    const handleContentOpening = async () => {
        await updateScores(dayId, ScoreType.ContentOpening);
        router.push({
            pathname: `/calendar/day/${String(dayId)}/content/${contentType}`,
        });
    };

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <Pressable style={styles.button} onPress={handleContentOpening}>
                <ThemedText type="pallyBoldSnow" style={styles.title}>
                    {getContentTitle(content, ideas, games)}
                </ThemedText>
            </Pressable>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
    },
    button: {
        padding: 5,
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
});
