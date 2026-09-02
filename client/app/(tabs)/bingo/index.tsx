import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { HubCard } from "@/components/navigation/HubCard";
import { Game2048RulesModal } from "@/components/games2048/Game2048RulesModal";
import { BingoRulesModal } from "@/components/bingo/BingoRulesModal";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export default function GamesHubScreen() {
    const [game2048RulesVisible, setGame2048RulesVisible] = useState(false);
    const [bingoRulesVisible, setBingoRulesVisible] = useState(false);

    const goal = isOctober ? "chaudron magique !" : "Père Noël 🎅";

    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <View style={styles.cardsContainer}>
                    <HubCard
                        title={`Le 2048 ${isOctober ? "d'automne" : "de Noël"}`}
                        description={`Faites glisser les cases dans tous les\u00A0sens pour tenter d'atteindre le\u00A0${goal}`}
                        color={isOctober ? Colors.autumnGreenDark : Colors.red}
                        route="game2048"
                        onRulesPress={() => setGame2048RulesVisible(true)}
                    />

                    <HubCard
                        title={
                            isOctober
                                ? "Le bingo d'automne"
                                : "Les bingos de Noël"
                        }
                        description={
                            isOctober
                                ? "Réalisez un maximum d'activités typiquement automnales tout au long du mois d'octobre"
                                : "Trois bingos à réaliser tout au long du mois de décembre pour se plonger dans l'ambiance de Noël"
                        }
                        color={Theme.green}
                        route={isOctober ? "halloween" : "bingos"}
                        onRulesPress={() => setBingoRulesVisible(true)}
                    />
                </View>

                <Game2048RulesModal
                    modalVisible={game2048RulesVisible}
                    setModalVisible={setGame2048RulesVisible}
                />

                <BingoRulesModal
                    modalVisible={bingoRulesVisible}
                    setModalVisible={setBingoRulesVisible}
                />
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        width: "100%",
        gap: 24,
        paddingHorizontal: 20,
    },
});
