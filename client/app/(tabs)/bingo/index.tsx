import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { BingoGrid } from "@/components/bingo/BingoGrid";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { bingo_halloween } from "@/data/bingos/bingo_halloween_data";
import { StorageKeys } from "@/constants/storageKeys";

export default function BingoScreen() {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    // Octobre : un seul bingo automne/Halloween.
    // Le reste de l'année (à partir du 1er novembre) : les 2 bingos de Noël.
    if (isOctober) {
        return (
            <BlueBackground>
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[styles.rulesButton, { marginTop: insets.top + 10 }]}
                >
                    <ThemedText
                        type="italic14"
                        style={{
                            textDecorationLine: "underline",
                            color: Colors.snow,
                        }}
                    >
                        Comment ça marche ?
                    </ThemedText>
                </Pressable>

                <BingoGrid
                    clickedCellsKey={StorageKeys.bingoHalloweenClickedCells}
                    grid={bingo_halloween}
                    columns={3}
                    scrollable={false}
                />

                <BingoRulesModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </BlueBackground>
        );
    }

    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[styles.button, { alignSelf: "flex-end" }]}
                >
                    <ThemedText
                        type="italic14"
                        style={{
                            textDecorationLine: "underline",
                            color: Colors.snow,
                        }}
                    >
                        Comment ça marche ?
                    </ThemedText>
                </Pressable>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {/* Activités */}
                    <View style={styles.card}>
                        <ThemedText
                            style={[styles.cardTitle, { color: Colors.red }]}
                        >
                            Le bingo des activités de&nbsp;Noël
                        </ThemedText>
                        <ThemedText style={styles.cardSubtitle}>
                            Profitez au maximum de la&nbsp;magie de&nbsp;Noël
                            tout au&nbsp;long du&nbsp;mois de&nbsp;décembre
                        </ThemedText>
                        <Pressable
                            style={[
                                styles.button,
                                { backgroundColor: Colors.red },
                            ]}
                            onPress={() => router.push("/bingo/activities")}
                        >
                            <ThemedText style={styles.buttonText}>
                                Jouer
                            </ThemedText>
                        </Pressable>
                    </View>

                    {/* Téléfilms */}
                    <View style={styles.card}>
                        <ThemedText
                            style={[styles.cardTitle, { color: Colors.green }]}
                        >
                            Le bingo des téléfilms de&nbsp;Noël
                        </ThemedText>
                        <ThemedText style={styles.cardSubtitle}>
                            Repérez le plus de clichés possible devant un
                            téléfilm de&nbsp;Noël
                        </ThemedText>
                        <Pressable
                            style={[
                                styles.button,
                                { backgroundColor: Colors.green },
                            ]}
                            onPress={() => router.push("/bingo/telefilms")}
                        >
                            <ThemedText style={styles.buttonText}>
                                Jouer
                            </ThemedText>
                        </Pressable>
                    </View>
                </View>

                <BingoRulesModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    rulesButton: {
        alignSelf: "flex-end",
        paddingHorizontal: 10,
    },
    bingoContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "center",
        marginHorizontal: 20,
        marginBottom: 15,
    },
    card: {
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        margin: 20,
        backgroundColor: Colors.snow,
        opacity: 0.9,
        gap: 8,
    },
    cardTitle: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "PallyBold",
    },
    cardSubtitle: {
        fontSize: 14,
        textAlign: "center",
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignSelf: "center",
    },
    buttonText: {
        color: Colors.snow,
    },
});
