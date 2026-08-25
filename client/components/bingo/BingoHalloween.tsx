import { StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { BingoGrid } from "@/components/bingo/BingoGrid";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { bingo_halloween } from "@/data/bingos/bingo_halloween_data";
import { StorageKeys } from "@/constants/storageKeys";

interface BingoHalloweenProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const BingoHalloween = ({
    modalVisible,
    setModalVisible,
}: BingoHalloweenProps) => {
    const insets = useSafeAreaInsets();

    return (
        <BlueBackground>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={[styles.rulesButton, { marginTop: insets.top + 10 }]}
            >
                <ThemedText type="italic14" style={styles.rulesButtonText}>
                    Comment ça marche ?
                </ThemedText>
            </Pressable>

            <BingoGrid
                clickedCellsKey={StorageKeys.bingoHalloweenClickedCells}
                grid={bingo_halloween}
                columns={3}
            />

            <BingoRulesModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </BlueBackground>
    );
};

const styles = StyleSheet.create({
    rulesButton: {
        alignSelf: "flex-end",
        paddingHorizontal: 10,
    },
    rulesButtonText: {
        textDecorationLine: "underline",
        color: Colors.snow,
    },
});
