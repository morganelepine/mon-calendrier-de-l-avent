import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { HangmanModal } from "@/components/content/games/hangman/HangmanModal";
import { WordleGrid } from "@/components/content/games/wordle/WordleGrid";
import {
    BACKSPACE,
    ENTER,
    WordleKeyboard,
} from "@/components/content/games/wordle/WordleKeyboard";
import { getKeyboardStatuses, normalizeWord } from "@/utils/wordle/engine";
import { Content } from "@/interfaces/contentInterface";
import { Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

interface MysteryWordProps {
    game: Content;
    setScore: (questionNumber: number, isCorrect: boolean) => Promise<void>;
}

const maxTries = 6;

export const Wordle: React.FC<MysteryWordProps> = ({ game, setScore }) => {
    const words = game.content1
        .toUpperCase()
        .split(",")
        .map((w) => w.trim());
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWord = words[currentWordIndex];
    const answer = normalizeWord(currentWord);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        setGuesses([]);
        setCurrentGuess("");
        setIsFinished(false);
        setError("");
    }, [currentWord]);

    const submitGuess = () => {
        if (currentGuess.length !== answer.length) {
            setError(`Le mot doit faire ${answer.length} lettres`);
            return;
        }

        const updatedGuesses = [...guesses, currentGuess];
        setGuesses(updatedGuesses);
        setCurrentGuess("");

        const isCorrect = currentGuess === answer;
        if (isCorrect || updatedGuesses.length === maxTries) {
            setIsFinished(true);
            setModalMessage(
                isCorrect
                    ? "Félicitations 🥳"
                    : "Dommage, vous avez atteint le nombre maximum d'essais 😟",
            );
            setModalVisible(true);
            void setScore(currentWordIndex, isCorrect);
        }
    };

    const handleKeyPress = (key: string) => {
        if (isFinished) return;
        setError("");

        if (key === ENTER) {
            submitGuess();
        } else if (key === BACKSPACE) {
            setCurrentGuess(currentGuess.slice(0, -1));
        } else if (currentGuess.length < answer.length) {
            setCurrentGuess(currentGuess + key);
        }
    };

    const handleNextQuestion = () => {
        setCurrentWordIndex(currentWordIndex + 1);
        setModalVisible(false);
    };

    const onClose = () => {
        if (currentWordIndex === words.length - 1) {
            setCurrentWordIndex(0);
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
        }
        setModalVisible(false);
    };

    return (
        <View key={game.id} style={{ alignItems: "center" }}>
            <ThemedText type={"contentSubtitle"}>
                {`Trouvez ${words.length} mots mystères autour ${isOctober ? "de l'automne ou d'Halloween" : "de l'hiver ou de Noël"}`}
            </ThemedText>

            <View style={styles.infos}>
                <ThemedText style={styles.info}>
                    Mot : {currentWordIndex + 1} sur {words.length}
                </ThemedText>
                <ThemedText style={styles.info}>
                    {answer.length} lettres
                </ThemedText>
            </View>

            <WordleGrid
                answer={answer}
                guesses={guesses}
                currentGuess={currentGuess}
                maxTries={maxTries}
            />

            {error && (
                <ThemedText type="italic14" style={styles.error}>
                    {error}
                </ThemedText>
            )}

            <WordleKeyboard
                statuses={getKeyboardStatuses(guesses, answer)}
                onKeyPress={handleKeyPress}
            />

            <HangmanModal
                modalVisible={modalVisible}
                modalMessage={modalMessage}
                onClose={onClose}
                words={words}
                currentWord={currentWord}
                currentWordIndex={currentWordIndex}
                handleNextQuestion={handleNextQuestion}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    infos: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 20,
        width: "100%",
    },
    info: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Theme.autumnGreenDarkToautumnGreen,
        fontSize: 14,
        color: Theme.autumnGreenDarkToautumnGreen,
        textAlign: "center",
    },
    error: {
        color: Theme.orangeToRed,
        marginBottom: 12,
    },
});
