import { useState } from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Infos } from "@/components/content/games/hangman/Infos";
import { Alphabet } from "@/components/content/games/hangman/Alphabet";
import { HangmanModal } from "@/components/content/games/hangman/HangmanModal";
import { Content } from "@/interfaces/contentInterface";
import { isOctober } from "@/constants/Dates";

interface HangmanProps {
    game: Content;
    setScore: (questionNumber: number, isCorrect: boolean) => Promise<void>;
}

const hideWord = (word: string): string[] => word.split("").map(() => "_");

export const Hangman: React.FC<HangmanProps> = ({ game, setScore }) => {
    const words = game.content1.toUpperCase().split(",");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWord = words[currentWordIndex];
    const [hiddenWord, setHiddenWord] = useState(() => hideWord(currentWord));
    const maxTries = 6;
    const [mistakes, setMistakes] = useState(0);
    const [clickedLetters, setClickedLetters] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const goToWord = (index: number) => {
        setCurrentWordIndex(index);
        setHiddenWord(hideWord(words[index]));
        setClickedLetters([]);
        setMistakes(0);
        setModalVisible(false);
    };

    const finishWord = async (isCorrect: boolean) => {
        setModalMessage(
            isCorrect
                ? "Félicitations 🥳"
                : "Dommage, vous avez atteint le nombre maximum d'essais 😟",
        );
        setModalVisible(true);
        await setScore(currentWordIndex, isCorrect);
    };

    const checkLetter = (letter: string) => {
        if (clickedLetters.includes(letter)) {
            return;
        }

        setClickedLetters([...clickedLetters, letter]);

        if (currentWord.includes(letter)) {
            const updatedHiddenWord = currentWord
                .split("")
                .map((char, index) =>
                    char === letter ? char : hiddenWord[index],
                );
            setHiddenWord(updatedHiddenWord);
            if (updatedHiddenWord.join("") === currentWord) finishWord(true);
        } else {
            setMistakes(mistakes + 1);
            if (mistakes + 1 === maxTries) finishWord(false);
        }
    };

    const handleNextQuestion = () => goToWord(currentWordIndex + 1);

    const onClose = () =>
        goToWord(
            currentWordIndex === words.length - 1 ? 0 : currentWordIndex + 1,
        );

    return (
        <View key={game.id} style={{ alignItems: "center" }}>
            <ThemedText type={"contentSubtitle"}>
                {`Trouvez ${words.length} mots autour ${isOctober ? "de l'automne ou d'Halloween" : "de l'hiver ou de Noël"}`}
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
