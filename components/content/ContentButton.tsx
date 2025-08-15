import { StyleSheet, Pressable, ImageBackground } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { updateScores } from "@/services/score.service";
import { getContentTitle } from "@/services/content.service";
import { Content } from "@/interfaces/contentInterface";
import { ScoreType } from "@/enums/enums";

interface ContentButtonProps {
    content?: Content;
    ideas?: Content[];
    games?: Content[];
    setModalVisible: (visible: boolean) => void;
    dayId: number;
    backgroundImage: string;
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
    setModalVisible,
    dayId,
    backgroundImage,
}) => {
    const handleContentOpening = async () => {
        await updateScores(dayId, ScoreType.ContentOpening);
        setModalVisible(true);
    };

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <Pressable style={styles.button} onPress={handleContentOpening}>
                <ThemedText style={styles.title}>
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
        color: "white",
        fontSize: 24,
        letterSpacing: 3,
        fontFamily: "PallyBold",
        textAlign: "center",
    },
});
