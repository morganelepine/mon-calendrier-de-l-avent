import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BingoCell } from "@/components/bingo/BingoCell";
import { BackgroundImage } from "@/components/utils/BackgroundImage";
import { Bingo } from "@/interfaces/bingoInterface";

interface BingoGridProps {
    clickedCellsKey: string;
    grid: Bingo[];
}

export const BingoGrid: React.FC<BingoGridProps> = ({
    clickedCellsKey,
    grid,
}) => {
    const [clickedCells, setClickedCells] = useState<Set<number>>(new Set());
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedClicked = await AsyncStorage.getItem(
                    clickedCellsKey
                );

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
                    JSON.stringify([...clickedCells])
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

    return (
        <BackgroundImage image="blue_background_darker_d10kn5">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.bingoContainer}>
                    {grid.map((cell) => (
                        <BingoCell
                            key={cell.id}
                            cell={cell}
                            isClicked={clickedCells.has(cell.id)}
                            onClick={handleCellClick}
                        />
                    ))}
                </View>
            </ScrollView>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    bingoContainer: {
        flex: 1,
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        margin: 12,
    },
});
