import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { BingoHalloween } from "@/components/bingo/BingoHalloween";
import { BingoCard } from "@/components/bingo/BingoCard";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export default function BingoScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    if (isOctober) {
        return (
            <BingoHalloween
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        );
    }

    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={styles.button}
                >
                    <ThemedText type="italic14" style={styles.buttonText}>
                        Comment ça marche ?
                    </ThemedText>
                </Pressable>

                <View style={styles.bingosContainer}>
                    <BingoCard
                        type="films"
                        description="Regardez un maximum de films cultes de Noël durant le mois de décembre"
                        color={Colors.green}
                        route="movies"
                    />

                    <BingoCard
                        type="activités"
                        description="Profitez au maximum de la&nbsp;magie de&nbsp;Noël tout au long du mois"
                        color={Colors.autumnGreen}
                        route="activities"
                    />

                    <BingoCard
                        type="téléfilms"
                        description="Repérez le plus de clichés possible devant un téléfilm de&nbsp;Noël"
                        color={Colors.red}
                        route="telefilms"
                    />
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
    bingosContainer: {
        flex: 1,
        justifyContent: "center",
        gap: 20,
        margin: 20,
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignSelf: "flex-end",
    },
    buttonText: {
        textDecorationLine: "underline",
        color: Colors.snow,
    },
});
