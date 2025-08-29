import { useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { BingoCell } from "@/components/bingo/BingoCell";
import { BingoHeader } from "@/components/bingo/BingoHeader";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { bingo } from "@/data/bingo_data";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";

export default function BingoScreen() {
    const backgroundImage = getCloudinaryImageUrl(
        "blue_background_darker_d10kn5"
    ); // "sapin_fnbne4

    const [modalVisible, setModalVisible] = useState(false);

    const shuffled = bingo.sort(() => Math.random() - 0.5);
    const [bingoGrid, setBingoGrid] = useState(bingo.slice(0, 15));
    const [clickedCells, setClickedCells] = useState(new Set());

    const [fadeAnim] = useState(new Animated.Value(1));

    const generateBingoGrid = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.8, // opaciy
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setClickedCells(new Set());
            setBingoGrid(shuffled.slice(0, 15));
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleCellClick = (cell: number) => {
        setClickedCells((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cell)) {
                newSet.delete(cell);
            } else {
                newSet.add(cell);
            }
            return newSet;
        });
    };

    return (
        <ImageBackground
            source={{
                uri: backgroundImage,
            }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <CustomSafeAreaView>
                <BingoHeader
                    generateBingoGrid={generateBingoGrid}
                    setModalVisible={setModalVisible}
                />

                <View style={styles.bingoContainer}>
                    {bingoGrid.map((cell) => (
                        <BingoCell
                            key={cell.id}
                            cell={cell}
                            isClicked={clickedCells.has(cell.id)}
                            onClick={handleCellClick}
                        />
                    ))}
                </View>

                <BingoRulesModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </CustomSafeAreaView>
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        gap: 6,
        marginHorizontal: 15,
        marginBottom: 20,
    },
});
