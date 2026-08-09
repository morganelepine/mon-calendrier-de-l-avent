import { StyleSheet, TextInput, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { saveScore } from "@/services/score.service";
import { ScoreType } from "@/enums/enums";

interface GameToAnswerProps {
    answer: string;
    index: number;
    setWin: (win: boolean) => void;
    input: string;
    setInput: (input: string) => void;
    setShowResult: (showResult: boolean) => void;
    title: string;
    dayId: number;
}

export const GameToAnswer: React.FC<GameToAnswerProps> = ({
    answer,
    index,
    setWin,
    input,
    setInput,
    setShowResult,
    title,
    dayId,
}) => {
    const handleInputValidation = async () => {
        const valueTrim = input.trim();
        if (!valueTrim) return;

        const isCorrect = answer
            .toLowerCase()
            .includes(valueTrim.toLowerCase());
        setWin(isCorrect);
        setShowResult(true);

        const stored = await AsyncStorage.getItem("storyGameAnswers");
        const answers = stored ? JSON.parse(stored) : {};

        if (!answers[index] && isCorrect) {
            try {
                await saveScore(dayId, 50, String(ScoreType.StoryGame), index);
                ToastAndroid.show(
                    "+ 50 points sur votre score total !",
                    ToastAndroid.LONG
                );
            } catch (error) {
                console.log("Error saving score:", error);
                ToastAndroid.show(
                    "Oops... votre score n'a pas pu être enregistré.",
                    ToastAndroid.LONG
                );
            }
        } else if (!answers[index] && !isCorrect) {
            try {
                await saveScore(dayId, 15, String(ScoreType.StoryGame), index);
                ToastAndroid.show(
                    "Surprise : + 15 points pour avoir tenté votre chance !",
                    ToastAndroid.LONG
                );
            } catch (error) {
                console.log("Error saving score:", error);
                ToastAndroid.show(
                    "Oops... votre score n'a pas pu être enregistré.",
                    ToastAndroid.LONG
                );
            }
        }

        answers[index] = valueTrim;

        await AsyncStorage.setItem("storyGameAnswers", JSON.stringify(answers));
    };

    return (
        <>
            <ThemedText style={{ textAlign: "center" }}>
                Le {index === 3 ? "film" : "livre"} qui se cache derrière
                la&nbsp;nouvelle "{title}" est...
            </ThemedText>

            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Votre réponse"
            />

            <CustomButton style={styles.button} onPress={handleInputValidation}>
                Valider
            </CustomButton>

            <ThemedText type={"italic14"}>
                Attention ! Pour rappel, vous ne pourrez répondre à cette
                question qu'une seule fois...
            </ThemedText>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.green,
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingBottom: 8,
        fontFamily: "Poppins",
        marginVertical: 16,
        minHeight: 48,
    },
    button: {
        marginTop: 8,
        marginBottom: 28,
        backgroundColor: Colors.green,
        paddingHorizontal: 32,
    },
});
