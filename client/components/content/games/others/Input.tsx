import { StyleSheet, View, TextInput, Platform } from "react-native";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors, Theme } from "@/constants/Colors";

interface InputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    currentWordIndex: number;
    answer: string;
    setScore: (questionNumber: number, isCorrect: boolean) => Promise<void>;
    showResult: boolean;
    setShowResult: (show: boolean) => void;
    setResultText: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
    inputValue,
    setInputValue,
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

        setScore(currentWordIndex, isCorrect);

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
                    backgroundColor: Theme.green,
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
        borderColor: Theme.green,
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === "web" ? 0 : 6,
        fontFamily: "Poppins",
        // iOS Safari auto-zooms on focus for any input under 16px.
        fontSize: 16,
        height: 48,
    },
    disabledInput: {
        borderColor: Colors.disabledText,
        color: Colors.disabledText,
    },
});
