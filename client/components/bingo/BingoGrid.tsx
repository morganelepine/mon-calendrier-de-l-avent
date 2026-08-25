import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BingoCell } from "@/components/bingo/BingoCell";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { Bingo } from "@/interfaces/bingoInterface";

interface BingoGridProps {
    clickedCellsKey: string;
    grid: Bingo[];
    columns: number;
}

export const BingoGrid: React.FC<BingoGridProps> = ({
    clickedCellsKey,
    grid,
    columns,
}) => {
    const [clickedCells, setClickedCells] = useState<Set<number>>(new Set());
    const [isReady, setIsReady] = useState(false);
    const [containerSize, setContainerSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedClicked =
                    await AsyncStorage.getItem(clickedCellsKey);

                if (savedClicked) {
                    const parsedClicked = JSON.parse(savedClicked);
                    setClickedCells(new Set(parsedClicked));
                }

                setIsReady(true);
            } catch (e) {
                console.error("Error loading data:", e);
            }
        };
        loadData();
    }, []);

    // Save clicked cells after loading
    useEffect(() => {
        if (!isReady) return; // ignore first render
        const saveClicked = async () => {
            try {
                await AsyncStorage.setItem(
                    clickedCellsKey,
                    JSON.stringify([...clickedCells]),
                );
            } catch (e) {
                console.error("Error saving clicked:", e);
            }
        };
        saveClicked();
    }, [clickedCells, isReady]);

    const handleCellClick = (cellId: number) => {
        setClickedCells((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cellId)) {
                newSet.delete(cellId);
            } else {
                newSet.add(cellId);
            }
            return newSet;
        });
    };

    // The grid must fit entirely within the available space:
    // compute a fixed cell size from the measured container
    // so all rows fit both horizontally and vertically without scrolling.
    const rows = Math.ceil(grid.length / columns);
    const cellSize = containerSize
        ? Math.floor(
              Math.min(
                  containerSize.width / columns,
                  containerSize.height / rows,
              ),
          )
        : undefined;

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
    };

    return (
        <BlueBackground>
            <View style={styles.centeredContainer} onLayout={handleLayout}>
                {cellSize !== undefined && (
                    <View
                        style={[
                            styles.bingoContainer,
                            {
                                width: cellSize * columns,
                                height: cellSize * rows,
                            },
                        ]}
                    >
                        {grid.map((cell) => (
                            <BingoCell
                                key={cell.id}
                                cell={cell}
                                isClicked={clickedCells.has(cell.id)}
                                onClick={handleCellClick}
                                size={cellSize}
                            />
                        ))}
                    </View>
                )}
            </View>
        </BlueBackground>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
    },
    bingoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});
