import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";
import { Qcm } from "@/components/content/games/others/Qcm";
import { Input } from "@/components/content/games/others/Input";

interface OtherGamesProps {
    game: Content;
    setScore: (questionNumber: number) => Promise<void>;
}

export const OtherGames: React.FC<OtherGamesProps> = ({ game, setScore }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [win, setWin] = useState("");

    return (
        <View key={game.id}>
            <ThemedText type="contentSubtitle" style={styles.title}>
                {game.title}
            </ThemedText>

            <CustomMarkdown>{game.content1}</CustomMarkdown>

            {game.listOfContents ? (
                <Qcm
                    game={game}
                    setScore={setScore}
                    setShowAnswer={setShowAnswer}
                    setWin={setWin}
                />
            ) : (
                <Input
                    game={game}
                    setScore={setScore}
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}
                    setWin={setWin}
                />
            )}

            {showAnswer && (
                <View>
                    {win ? (
                        <ThemedText style={styles.longAnswer}>{win}</ThemedText>
                    ) : (
                        <>
                            {!!game.content2 && (
                                <ThemedText style={styles.shortAnswer}>
                                    {game.content2}
                                </ThemedText>
                            )}
                            {!!game.content3 && (
                                <ThemedText style={styles.longAnswer}>
                                    {game.content3}
                                </ThemedText>
                            )}
                        </>
                    )}

                    {game.content4 ? (
                        <ThemedText>{game.content4}</ThemedText>
                    ) : null}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
    },
    shortAnswer: {
        fontFamily: "PallyBold",
        color: Colors.red,
        fontSize: 20,
        marginBottom: 10,
    },
    longAnswer: {
        fontFamily: "PoppinsBold",
        color: Colors.red,
        marginBottom: 10,
    },
});
