import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Game2048Header } from "@/components/games2048/Game2048Header";
import { Game2048Board } from "@/components/games2048/Game2048Board";
import { Game2048Footer } from "@/components/games2048/Game2048Footer";
import { useGame2048 } from "@/hooks/useGame2048";
import { Theme } from "@/constants/Colors";

export default function Game2048Screen() {
    const {
        board,
        score,
        bestScore,
        status,
        hasWon,
        isNewBest,
        play,
        startNewGame,
    } = useGame2048();

    return (
        <SafeAreaView edges={["top"]} style={styles.container}>
            <Game2048Header
                score={score}
                bestScore={bestScore}
                hasWon={hasWon}
                status={status}
            />

            <Game2048Board board={board} onPlay={play} />

            {status === "gameover" && (
                <Game2048Footer
                    isNewBest={isNewBest}
                    startNewGame={startNewGame}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.surface,
        justifyContent: "space-between",
    },
});
