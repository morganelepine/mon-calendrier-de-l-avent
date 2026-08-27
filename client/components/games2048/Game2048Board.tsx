import { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
    Directions,
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { Game2048Tile } from "@/components/games2048/Game2048Tile";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { Board, Direction, GRID_SIZE } from "@/utils/games2048/engine";

interface Game2048BoardProps {
    board: Board;
    onPlay: (direction: Direction) => void;
}

const GAP = 8;

export const Game2048Board: React.FC<Game2048BoardProps> = ({
    board,
    onPlay,
}) => {
    const [containerSize, setContainerSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };

    const cellSize = containerSize
        ? Math.floor(
              (Math.min(containerSize.width, containerSize.height) -
                  GAP * (GRID_SIZE - 1)) /
                  GRID_SIZE,
          )
        : undefined;

    // Fling's onEnd callback runs on the UI thread (Reanimated's babel plugin
    // auto-worklet-izes an inline callback written directly at a gesture
    // call site like this one) - onPlay updates React state, so it has to be
    // scheduled back onto the JS thread rather than called directly.
    const swipe = Gesture.Race(
        Gesture.Fling()
            .direction(Directions.UP)
            .onEnd((_event, success) => {
                if (success) scheduleOnRN(onPlay, "up");
            }),
        Gesture.Fling()
            .direction(Directions.DOWN)
            .onEnd((_event, success) => {
                if (success) scheduleOnRN(onPlay, "down");
            }),
        Gesture.Fling()
            .direction(Directions.LEFT)
            .onEnd((_event, success) => {
                if (success) scheduleOnRN(onPlay, "left");
            }),
        Gesture.Fling()
            .direction(Directions.RIGHT)
            .onEnd((_event, success) => {
                if (success) scheduleOnRN(onPlay, "right");
            }),
    );

    return (
        <BlueBackground>
            <GestureDetector gesture={swipe}>
                <View style={styles.centeredContainer} onLayout={handleLayout}>
                    {cellSize !== undefined && board.length > 0 && (
                        <View
                            style={[
                                styles.grid,
                                {
                                    width:
                                        cellSize * GRID_SIZE +
                                        GAP * (GRID_SIZE - 1),
                                    height:
                                        cellSize * GRID_SIZE +
                                        GAP * (GRID_SIZE - 1),
                                },
                            ]}
                        >
                            {board.map((row, rowIndex) =>
                                row.map((tier, colIndex) => (
                                    <Game2048Tile
                                        key={`${rowIndex}-${colIndex}`}
                                        tier={tier}
                                        size={cellSize}
                                    />
                                )),
                            )}
                        </View>
                    )}
                </View>
            </GestureDetector>
        </BlueBackground>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GAP,
    },
});
