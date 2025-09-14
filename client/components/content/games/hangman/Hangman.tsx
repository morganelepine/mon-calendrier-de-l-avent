import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { Infos } from "@/components/content/games/hangman/Infos";
import { Alphabet } from "@/components/content/games/hangman/Alphabet";
import { HangmanModal } from "@/components/content/games/hangman/HangmanModal";
import { Content } from "@/interfaces/contentInterface";
import { isQuestionPlayed, saveQuestionPlayed } from "@/services/score.service";

interface HangmanProps {
    game: Content;
    setScore: (questionNumber: number) => Promise<void>;
    refreshScores: () => Promise<void>;
}

export const Hangman: React.FC<HangmanProps> = ({
    game,
    setScore,
    refreshScores,
}) => {
    const words = game.content1.toUpperCase().split(",");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWord = words[currentWordIndex];
    const [hiddenWord, setHiddenWord] = useState<string[]>([]);
    const maxTries = 7;
    const [mistakes, setMistakes] = useState(0);
    const [clickedLetters, setClickedLetters] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        setHiddenWord(currentWord.split("").map(() => "_"));
        setClickedLetters([]);
        setMistakes(0);
    }, [currentWord]);

    useEffect(() => {
        const handleScoreUpdate = async () => {
            if (currentWord === hiddenWord.join("")) {
                const alreadyPlayed = await isQuestionPlayed(
                    game.dayNumber,
                    currentWordIndex
                );
                if (!alreadyPlayed) {
                    await setScore(currentWordIndex);
                    await refreshScores();
                }

                setModalMessage("Félicitations 🥳");
                setModalVisible(true);
            } else if (mistakes === maxTries) {
                setModalMessage(
                    "Dommage, vous avez atteint le nombre maximum d'essais 😟"
                );
                setModalVisible(true);
            }
        };
        handleScoreUpdate();
    }, [hiddenWord, mistakes]);

    const checkLetter = (letter: string) => {
        if (clickedLetters.includes(letter)) {
            return;
        }

        setClickedLetters([...clickedLetters, letter]);

        if (currentWord.includes(letter)) {
            const updatedHiddenWord = currentWord
                .split("")
                .map((char, index) =>
                    char === letter ? char : hiddenWord[index]
                );
            setHiddenWord(updatedHiddenWord);
        } else {
            setMistakes(mistakes + 1);
        }
    };

    const handleNextQuestion = async () => {
        await saveQuestionPlayed(game.dayNumber, currentWordIndex);
        setCurrentWordIndex(currentWordIndex + 1);
        setModalVisible(false);
    };

    const onClose = () => {
        if (currentWordIndex === words.length - 1) {
            setCurrentWordIndex(0);
            setModalVisible(false);
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
            setModalVisible(false);
        }
    };

    return (
        <View key={game.id} style={{ alignItems: "center" }}>
            <ThemedText
                type={"contentSubtitle"}
                style={{ textAlign: "center" }}
            >
                Trouvez 3 mots autour de l'hiver et&nbsp;de&nbsp;Noël
            </ThemedText>

            <ThemedText style={{ fontSize: 35, paddingTop: 10 }}>
                {hiddenWord.join(" ")}
            </ThemedText>

            <Infos
                currentWordIndex={currentWordIndex}
                words={words}
                mistakes={mistakes}
                maxTries={maxTries}
            />

            <Alphabet
                clickedLetters={clickedLetters}
                checkLetter={checkLetter}
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
