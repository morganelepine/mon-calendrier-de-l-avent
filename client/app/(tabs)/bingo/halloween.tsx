import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { BingoGrid } from "@/components/bingo/BingoGrid";
import { bingo_halloween } from "@/data/bingos/bingo_halloween_data";
import { StorageKeys } from "@/constants/storageKeys";

export default function HalloweenBingoScreen() {
    const insets = useSafeAreaInsets();

    return (
        <BlueBackground>
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <BingoGrid
                    clickedCellsKey={StorageKeys.bingoHalloweenClickedCells}
                    grid={bingo_halloween}
                    columns={3}
                />
            </View>
        </BlueBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
