import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { OptionItem } from "@/components/informations/OptionItem";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { useUser } from "@/contexts/UserContext";

export default function InformationsScreen() {
    const { username } = useUser();

    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <View style={styles.pageContainer}>
                    <ThemedText style={styles.username}>
                        Bienvenue {username}
                    </ThemedText>
                    <OptionItem
                        title="Contenu de l'application"
                        iconName="gift-outline"
                        iconColor={
                            isOctober ? Colors.autumnGreenDark : Colors.blue
                        }
                        onPress={() => router.push("/informations/content")}
                    />

                    <OptionItem
                        title="Règles pour gagner des points"
                        iconName="game-controller-outline"
                        iconColor={
                            isOctober ? Colors.autumnYellow : Colors.lightBlue
                        }
                        onPress={() => router.push("/informations/rules")}
                    />

                    <OptionItem
                        title={
                            isOctober
                                ? "Fonctionnement du bingo"
                                : "Fonctionnement des bingos"
                        }
                        iconName="eye-outline"
                        iconColor={
                            isOctober ? Colors.autumnGreen : Colors.green
                        }
                        onPress={() => router.push("/informations/bingo")}
                    />

                    <OptionItem
                        title="Soutenir l'application"
                        iconName="star-outline"
                        iconColor={isOctober ? Colors.autumnRed : Colors.gold}
                        onPress={() => router.push("/informations/rate")}
                    />

                    <OptionItem
                        title="Remerciements"
                        iconName="heart-outline"
                        iconColor={
                            isOctober ? Colors.autumnGreenDark : Colors.red
                        }
                        onPress={() => router.push("/informations/copyrights")}
                    />

                    <OptionItem
                        title="Me contacter"
                        iconName="flower-outline"
                        iconColor={isOctober ? Colors.autumnYellow : "#646681"}
                        onPress={() => router.push("/informations/contact")}
                    />

                    <OptionItem
                        title="Paramètres"
                        iconName="settings-outline"
                        iconColor={
                            isOctober ? Colors.autumnGreen : Colors.darkBlue
                        }
                        onPress={() => router.push("/informations/settings")}
                    />
                </View>
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    username: {
        color: Colors.snow,
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        paddingLeft: 20,
        gap: 12,
    },
});
