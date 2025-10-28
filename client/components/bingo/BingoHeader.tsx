import { Animated, Pressable, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Bingo } from "@/interfaces/bingoInterface";

interface BingoHeaderProps {
    bingo: Bingo[];
    setClickedCells: (newClickedCells: Set<number>) => void;
    setBingoGrid: (newGrid: Bingo[]) => void;
    setModalVisible: (modalVisible: boolean) => void;
    gridKey: string;
    clickedCellsKey: string;
}

export const BingoHeader: React.FC<BingoHeaderProps> = ({
    bingo,
    setClickedCells,
    setBingoGrid,
    setModalVisible,
    gridKey,
    clickedCellsKey,
}) => {
    const shuffled = bingo.sort(() => Math.random() - 0.5);
    const [fadeAnim] = useState(new Animated.Value(1));

    const generateBingoGrid = async () => {
        Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
        }).start(async () => {
            const newGrid = shuffled.slice(0, 15);
            setClickedCells(new Set());
            setBingoGrid(newGrid);

            await AsyncStorage.setItem(gridKey, JSON.stringify(newGrid));
            await AsyncStorage.setItem(clickedCellsKey, JSON.stringify([]));

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={styles.header}>
            <Pressable onPress={generateBingoGrid} style={styles.button}>
                <ThemedText type="italic14" style={styles.buttonText}>
                    Générer une nouvelle grille
                </ThemedText>
            </Pressable>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.button}
            >
                <ThemedText type="italic14" style={styles.buttonText}>
                    Voir les règles
                </ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: "100%",
    },
    button: {
        height: 48,
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.snow,
        textDecorationLine: "underline",
    },
});
