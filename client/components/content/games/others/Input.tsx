import { StyleSheet, View, TextInput } from "react-native";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { saveQuestionPlayed, isQuestionPlayed } from "@/services/score.service";

interface InputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    game: Content;
    currentWordIndex: number;
    answer: string;
    setScore: (questionNumber: number) => Promise<void>;
    showResult: boolean;
    setShowResult: (show: boolean) => void;
    setResultText: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
    inputValue,
    setInputValue,
    game,
    currentWordIndex,
    answer,
    setScore,
    showResult,
    setShowResult,
    setResultText,
}) => {
    const handleInputValidation = async () => {
        if (inputValue.trim() === "") return;

        const isCorrect =
            inputValue.trim().toLowerCase() === answer.toLowerCase();

        const alreadyPlayed = await isQuestionPlayed(
            game.dayNumber,
            currentWordIndex
        );

        if (!alreadyPlayed) {
            if (isCorrect) {
                setScore(currentWordIndex);
            }
            await saveQuestionPlayed(game.dayNumber, currentWordIndex);
        }

        if (isCorrect) {
            setResultText("Bravo ! Le mot à trouver était bien : " + answer);
        } else {
            setResultText(`Raté... la bonne réponse était : ${answer}`);
        }

        setShowResult(true);
    };

    return (
        <View style={{ marginVertical: 20 }}>
            <TextInput
                style={[styles.input, showResult && styles.disabledInput]}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Votre réponse"
                editable={!showResult}
            />
            <CustomButton
                style={{
                    marginTop: 20,
                    backgroundColor: Colors.green,
                }}
                onPress={handleInputValidation}
                disabled={showResult}
            >
                Valider
            </CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.green,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingBottom: 8,
        fontFamily: "Poppins",
    },
    disabledInput: {
        borderColor: Colors.disabledText,
        color: Colors.disabledText,
    },
});
