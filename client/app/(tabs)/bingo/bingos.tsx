import { StyleSheet, View } from "react-native";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { BingoCard } from "@/components/bingo/BingoCard";
import { Colors } from "@/constants/Colors";

export default function BingosScreen() {
    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <View style={styles.container}>
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
                </View>
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bingosContainer: {
        flex: 1,
        justifyContent: "center",
        gap: 20,
        margin: 20,
    },
});
