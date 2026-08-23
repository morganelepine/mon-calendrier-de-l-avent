import { StyleSheet, Pressable, ToastAndroid } from "react-native";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import {
    saveScore,
    isQuestionPlayed,
    saveQuestionPlayed,
} from "@/services/score.service";
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
    contentNumber: number;
}

export const ContentButton: React.FC<ContentButtonProps> = ({
    content = {
        id: 0,
        dayNumber: 0,
        type: "quote",
        subType: "",
        title: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
    },
    ideas = [],
    games = [],
    dayId,
    backgroundImage,
    contentType,
    contentNumber,
}) => {
    const registerContentOpening = async () => {
        const today = new Date().getDate();
        const score = dayId === today ? 20 : 10;

        const alreadyPlayed = await isQuestionPlayed(dayId, contentNumber);
        if (alreadyPlayed) {
            await saveQuestionPlayed(dayId, contentNumber);
        } else {
            try {
                await saveScore(
                    dayId,
                    score,
                    String(ScoreType.ContentOpening),
                    contentNumber,
                );
            } catch (error) {
                console.log("Error saving score:", error);
                ToastAndroid.show(
                    "Oops... les points n'ont pas pu être enregistrés.",
                    ToastAndroid.LONG,
                );
            }
            await saveQuestionPlayed(dayId, contentNumber);
        }
    };

    const handleContentOpening = () => {
        router.navigate({
            pathname: `/calendar/day/[id]/content/${contentType}`,
            params: { id: String(dayId) },
        });

        registerContentOpening();
    };

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            contentFit="cover"
            cachePolicy="memory-disk"
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
