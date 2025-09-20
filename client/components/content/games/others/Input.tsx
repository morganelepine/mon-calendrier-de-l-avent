import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";

interface InputProps {
    game: Content;
    setScore: (questionNumber: number) => Promise<void>;
    showAnswer: boolean;
    setShowAnswer: (show: boolean) => void;
    setWin: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
    game,
    setScore,
    showAnswer,
    setShowAnswer,
    setWin,
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputValidation = () => {
        if (inputValue.trim() === "") return;

        const correct =
            inputValue.toLowerCase() === game.content3?.toLowerCase();

        if (correct) {
            setScore(1);
            setWin("Bonne réponse !");
        } else {
            setWin(`Raté... la bonne réponse était : ${game.content3}`);
        }

        setShowAnswer(true);
    };

    return (
        <View style={{ marginVertical: 20 }}>
            <TextInput
                style={[styles.input, showAnswer && styles.disabledInput]}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Votre réponse"
                editable={!showAnswer}
            />
            <CustomButton
                style={{
                    marginTop: 20,
                    backgroundColor: Colors.green,
                }}
                onPress={handleInputValidation}
                disabled={showAnswer}
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
