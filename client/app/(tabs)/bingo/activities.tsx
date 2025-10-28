import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BingoCell } from "@/components/bingo/BingoCell";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { bingo_todo } from "@/data/bingo_todo_data";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

const CLICKED_CELLS_KEY = "bingo_activities_clicked_cells";
const GRID_KEY = "bingo_activities_grid";

export default function BingoTodoScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [bingoGrid, setBingoGrid] = useState(bingo_todo);
    const [clickedCells, setClickedCells] = useState<Set<number>>(new Set());
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedGrid = await AsyncStorage.getItem(GRID_KEY);
                const savedClicked = await AsyncStorage.getItem(
                    CLICKED_CELLS_KEY
                );

                if (savedGrid) {
                    const parsedGrid = JSON.parse(savedGrid);
                    setBingoGrid(parsedGrid);
                } else {
                    await AsyncStorage.setItem(
                        GRID_KEY,
                        JSON.stringify(bingoGrid)
                    );
                }

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
                    CLICKED_CELLS_KEY,
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
        <ImageBackground
            source={{
                uri: getCloudinaryImageUrl("blue_background_darker_d10kn5"),
            }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.bingoContainer}>
                    {bingoGrid.map((cell) => (
                        <BingoCell
                            key={cell.id}
                            cell={cell}
                            isClicked={clickedCells.has(cell.id)}
                            onClick={handleCellClick}
                            type={"activities"}
                        />
                    ))}
                </View>
            </ScrollView>

            <BingoRulesModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    bingoContainer: {
        flex: 1,
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        margin: 12,
    },
});
