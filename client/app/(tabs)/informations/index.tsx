import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { OptionItem } from "@/components/informations/OptionItem";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { useUser } from "@/contexts/UserContext";
// import { usePremium, PURCHASES_SUPPORTED } from "@/contexts/PremiumContext";

export default function InformationsScreen() {
    const { username } = useUser();
    // const { premiumPackage } = usePremium();

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
                        iconColor={isOctober ? Colors.autumnRed : Colors.blue}
                        onPress={() => router.push("/informations/content")}
                    />

                    {/* {premiumPackage && PURCHASES_SUPPORTED && (
                        <OptionItem
                            title="La Hotte Magique"
                            iconName="sparkles-outline"
                            iconColor={
                                isOctober
                                    ? Colors.autumnRed
                                    : Colors.autumnGreen
                            }
                            onPress={() => router.push("/informations/premium")}
                        />
                    )} */}

                    <OptionItem
                        title="Règles pour gagner des points"
                        iconName="game-controller-outline"
                        iconColor={isOctober ? Colors.gold : Colors.green}
                        onPress={() => router.push("/informations/rules")}
                    />

                    <OptionItem
                        title={"Fonctionnement des bingos"}
                        iconName="eye-outline"
                        iconColor={
                            isOctober
                                ? Colors.autumnGreenDark
                                : Colors.lightBlue
                        }
                        onPress={() => router.push("/informations/bingo")}
                    />

                    {!isOctober && (
                        <OptionItem
                            title="Remerciements"
                            iconName="heart-outline"
                            iconColor={Colors.red}
                            onPress={() =>
                                router.push("/informations/copyrights")
                            }
                        />
                    )}

                    <OptionItem
                        title="Noter l'application"
                        iconName="star-outline"
                        iconColor={
                            isOctober ? Colors.autumnOrange : Colors.gold
                        }
                        onPress={() => router.push("/informations/rate")}
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
        fontSize: 26,
        fontFamily: "FreightNeoBold",
        paddingRight: 8,
        marginBottom: 16,
    },
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        paddingLeft: 20,
        gap: 12,
    },
});
