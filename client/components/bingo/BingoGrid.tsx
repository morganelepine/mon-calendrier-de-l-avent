import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BingoCell } from "@/components/bingo/BingoCell";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { Bingo } from "@/interfaces/bingoInterface";

interface BingoGridProps {
    clickedCellsKey: string;
    grid: Bingo[];
    columns: number;
    scrollable?: boolean;
}

export const BingoGrid: React.FC<BingoGridProps> = ({
    clickedCellsKey,
    grid,
    columns,
    scrollable = true,
}) => {
    const [clickedCells, setClickedCells] = useState<Set<number>>(new Set());
    const [isReady, setIsReady] = useState(false);

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

    const cells = grid.map((cell) => (
        <BingoCell
            key={cell.id}
            cell={cell}
            isClicked={clickedCells.has(cell.id)}
            onClick={handleCellClick}
            columns={columns}
        />
    ));

    return (
        <BlueBackground>
            {scrollable ? (
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.bingoContainer}>{cells}</View>
                </ScrollView>
            ) : (
                <View style={styles.centeredContainer}>
                    <View style={styles.bingoContainer}>{cells}</View>
                </View>
            )}
        </BlueBackground>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
    },
    bingoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: 4,
    },
});
