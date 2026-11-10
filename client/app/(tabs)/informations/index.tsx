import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { OptionItem } from "@/components/informations/OptionItem";
import { Colors } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { INSTAGRAM_URL } from "@/constants/Links";
import { TEST_TOOLS_ENABLED } from "@/constants/testTools";
import { useUser } from "@/contexts/UserContext";
import { PURCHASES_SUPPORTED } from "@/contexts/PremiumContext";
import { ChallengeId } from "@/enums/enums";
import { completeChallenge } from "@/services/challenge.service";
import { openExternalUrl } from "@/utils/openExternalUrl";

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
                            isOctober ? Colors.autumnRed : Colors.lightRed
                        }
                        onPress={() => router.push("/informations/content")}
                    />

                    {PURCHASES_SUPPORTED && (
                        <OptionItem
                            title="La Hotte Magique"
                            iconName="sparkles-outline"
                            iconColor={
                                isOctober ? Colors.autumnGold : Colors.lightBlue
                            }
                            onPress={() => router.push("/informations/premium")}
                        />
                    )}

                    <OptionItem
                        title="Règles pour gagner des points"
                        iconName="game-controller-outline"
                        iconColor={
                            isOctober ? Colors.autumnGreenDark : Colors.green
                        }
                        onPress={() => router.push("/informations/rules")}
                    />

                    <OptionItem
                        title={"Fonctionnement des bingos"}
                        iconName="eye-outline"
                        iconColor={isOctober ? Colors.gold : Colors.autumnGreen}
                        onPress={() => router.push("/informations/bingo")}
                    />

                    {!isOctober && (
                        <OptionItem
                            title="Remerciements"
                            iconName="heart-outline"
                            iconColor={Colors.lightRed}
                            onPress={() => {
                                void completeChallenge(ChallengeId.Thanks);
                                router.push("/informations/copyrights");
                            }}
                        />
                    )}

                    <OptionItem
                        title="Noter l'application"
                        iconName="star-outline"
                        iconColor={
                            isOctober ? Colors.autumnOrange : Colors.lightBlue
                        }
                        onPress={() => router.push("/informations/rate")}
                    />

                    <OptionItem
                        title="Me rejoindre sur Instagram"
                        iconName="logo-instagram"
                        iconColor={isOctober ? Colors.autumnRed : Colors.green}
                        onPress={() => {
                            void completeChallenge(ChallengeId.FollowInstagram);
                            openExternalUrl(INSTAGRAM_URL);
                        }}
                    />

                    <OptionItem
                        title="Paramètres"
                        iconName="settings-outline"
                        iconColor={
                            isOctober ? Colors.autumnGreen : Colors.autumnGreen
                        }
                        onPress={() => router.push("/informations/settings")}
                    />

                    {TEST_TOOLS_ENABLED && (
                        <OptionItem
                            title="Test"
                            iconName="flask-outline"
                            iconColor={Colors.disabledText}
                            onPress={() => router.push("/informations/test")}
                        />
                    )}
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
