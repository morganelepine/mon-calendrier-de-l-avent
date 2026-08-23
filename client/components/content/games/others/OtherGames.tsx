import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/content/games/others/Input";
import { NextQuestion } from "@/components/content/games/util/NextQuestion";
import { Content } from "@/interfaces/contentInterface";
import { isOctober } from "@/constants/Dates";

interface OtherGamesProps {
    game: Content;
    setScore: (questionNumber: number, isCorrect: boolean) => Promise<void>;
}

export const OtherGames: React.FC<OtherGamesProps> = ({ game, setScore }) => {
    const words = game.content1.toUpperCase().split(",");
    const answers = (game.content2 ?? "").toUpperCase().split(",");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWord = words[currentWordIndex];
    const currentAnswer = answers[currentWordIndex];

    const [inputValue, setInputValue] = useState("");

    const [showResult, setShowResult] = useState(false);
    const [resultText, setResultText] = useState("");

    const handleNextQuestion = async () => {
        setCurrentWordIndex(currentWordIndex + 1);
        setShowResult(false);
        setInputValue("");
    };

    return (
        <View key={game.id}>
            <ThemedText type="contentSubtitle" style={styles.title}>
                {game.title}
            </ThemedText>

            <ThemedText>
                {isOctober
                    ? "Ces 3 mots sur le thème d'Halloween ou de l'automne ont fait des cauchemars cette nuit... Tentez de replacer leurs lettres dans le bon ordre !"
                    : "Ces 3 mots sur le thème de Noël ou de l'hiver ont bu un peu trop de vin chaud... Tentez de replacer leurs lettres dans le bon ordre !"}
            </ThemedText>

            <View style={styles.inputContainer}>
                {showResult ? (
                    <ThemedText style={styles.word}>{currentAnswer}</ThemedText>
                ) : (
                    <ThemedText style={styles.word}>{currentWord}</ThemedText>
                )}

                <Input
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    currentWordIndex={currentWordIndex}
                    answer={currentAnswer}
                    setScore={setScore}
                    showResult={showResult}
                    setShowResult={setShowResult}
                    setResultText={setResultText}
                />
            </View>

            {showResult && (
                <>
                    <ThemedText>{resultText}</ThemedText>
                    <NextQuestion
                        games={words}
                        currentQuestionIndex={currentWordIndex}
                        handleNextQuestion={handleNextQuestion}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: { marginBottom: 20 },
    inputContainer: {
        marginTop: 20,
        marginBottom: 10,
        justifyContent: "center",
    },
    word: {
        textAlign: "center",
        fontFamily: "PallyBold",
        fontSize: 32,
        letterSpacing: 8,
    },
});
