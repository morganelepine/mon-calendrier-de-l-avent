import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface AlphabetProps {
    clickedLetters: string[];
    checkLetter: (letter: string) => void;
}

export const Alphabet: React.FC<AlphabetProps> = ({
    clickedLetters,
    checkLetter,
}) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const getStyles = (letter: string) => {
        const isClicked = clickedLetters.includes(letter);

        return {
            buttonStyle: [
                styles.letter,
                isClicked ? styles.clickedLetter : null,
            ],
            textStyle: {
                color: !isClicked ? "white" : Colors.red,
                fontSize: 28,
                fontFamily: "PallyBold",
            },
        };
    };

    return (
        <View style={styles.alphabet}>
            {alphabet.map((letter) => {
                const { buttonStyle, textStyle } = getStyles(letter);
                return (
                    <Pressable
                        key={letter}
                        onPress={() => checkLetter(letter)}
                        style={buttonStyle}
                    >
                        <ThemedText style={textStyle}>{letter}</ThemedText>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    alphabet: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20,
        gap: 8,
    },
    letter: {
        backgroundColor: Colors.green,
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: "center",
    },
    clickedLetter: {
        backgroundColor: "white",
        opacity: 0.4,
        borderColor: Colors.red,
        borderWidth: 0.5,
    },
});
