import { StyleSheet, View } from "react-native";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { HubCard } from "@/components/navigation/HubCard";
import { Colors } from "@/constants/Colors";

export default function BingosScreen() {
    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <View style={styles.container}>
                    <HubCard
                        title="Bingo des films de&nbsp;Noël"
                        description="Regardez un maximum de films cultes de Noël durant le mois de décembre"
                        color={Colors.green}
                        route="movies"
                    />

                    <HubCard
                        title="Bingo des activités de&nbsp;Noël"
                        description="Profitez au maximum de la&nbsp;magie de&nbsp;Noël tout au long du mois"
                        color={Colors.autumnGreen}
                        route="activities"
                    />

                    <HubCard
                        title="Bingo des téléfilms de&nbsp;Noël"
                        description="Repérez le plus de clichés possible devant un téléfilm de&nbsp;Noël"
                        color={Colors.red}
                        route="telefilms"
                    />
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
        gap: 20,
        margin: 20,
    },
});
