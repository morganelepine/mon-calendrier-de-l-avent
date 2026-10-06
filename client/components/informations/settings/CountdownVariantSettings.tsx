import { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import {
    PremiumFeatureCard,
    PremiumFeaturePanel,
} from "@/components/informations/settings/PremiumFeatureCard";
import { NightsCountdown } from "@/components/calendar/Countdown/NightsCountdown";
import { ColumnsCountdown } from "@/components/calendar/Countdown/ColumnsCountdown";
import {
    useCountdownVariant,
    useCountdownShowSeconds,
    useChristmasTargetDay,
} from "@/contexts/CountdownVariantContext";
import { usePremium } from "@/contexts/PremiumContext";
import { ChristmasTargetDay, CountdownVariant } from "@/enums/enums";
import { Colors, Theme } from "@/constants/Colors";

const DEMO_COUNTDOWN = { days: 12, hours: 15, minutes: 13, seconds: 1 };
// The previews sit in a narrower box than the home screen countdown.
const PREVIEW_SCALE = 0.7;

export const CountdownVariantSettings = ({ color }: { color: string }) => {
    const { isPremium } = usePremium();
    const [variant, setVariant] = useCountdownVariant();
    const [showSeconds, setShowSeconds] = useCountdownShowSeconds();
    const [targetDay, setTargetDay] = useChristmasTargetDay();
    const [showSettings, setShowSettings] = useState(false);

    const options: { variant: CountdownVariant; preview: ReactNode }[] = [
        {
            variant: CountdownVariant.Nights,
            preview: (
                <NightsCountdown
                    nights={DEMO_COUNTDOWN.days}
                    scale={PREVIEW_SCALE}
                />
            ),
        },
        {
            variant: CountdownVariant.Columns,
            preview: (
                <ColumnsCountdown
                    {...DEMO_COUNTDOWN}
                    showSeconds={showSeconds}
                    scale={PREVIEW_SCALE}
                />
            ),
        },
    ];

    return (
        <PremiumFeatureCard
            title="Un compte à rebours personnalisable"
            color={color}
            description={
                <>
                    Choisissez comment le décompte s'affiche sur l'écran
                    d'accueil pendant le mois de décembre et décidez s’il vous
                    accompagne jusqu’au 24 ou jusqu’au 25&nbsp;décembre.
                </>
            }
        >
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowSettings((prev) => !prev)}
            >
                <ThemedText style={styles.toggleButtonText}>
                    {showSettings
                        ? "Masquer les paramètres"
                        : "Voir les paramètres"}
                </ThemedText>
                <Ionicons
                    name={showSettings ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={Colors.snow}
                />
            </TouchableOpacity>

            {showSettings && (
                <PremiumFeaturePanel>
                    <View
                        style={[styles.options, !isPremium && styles.disabled]}
                    >
                        {options.map(({ variant: optionVariant, preview }) => {
                            const selected = optionVariant === variant;

                            return (
                                <TouchableOpacity
                                    key={optionVariant}
                                    disabled={!isPremium}
                                    onPress={() => setVariant(optionVariant)}
                                    style={[
                                        styles.option,
                                        selected && styles.optionSelected,
                                    ]}
                                >
                                    <View style={styles.previewBox}>
                                        {preview}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <SettingsToggleRow
                        label={"Décompte jusqu'au 25"}
                        value={targetDay === ChristmasTargetDay.Day}
                        disabled={!isPremium}
                        onValueChange={(value) =>
                            setTargetDay(
                                value
                                    ? ChristmasTargetDay.Day
                                    : ChristmasTargetDay.Eve,
                            )
                        }
                    />

                    {variant !== CountdownVariant.Nights && (
                        <SettingsToggleRow
                            label={"Afficher les secondes"}
                            value={showSeconds}
                            disabled={!isPremium}
                            onValueChange={setShowSeconds}
                        />
                    )}
                </PremiumFeaturePanel>
            )}
        </PremiumFeatureCard>
    );
};

const styles = StyleSheet.create({
    toggleButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: 12,
    },
    toggleButtonText: {
        fontSize: 14,
        fontFamily: "PoppinsBold",
        color: Colors.snow,
    },
    options: {
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 16,
    },
    disabled: {
        opacity: 0.6,
    },
    option: {
        borderWidth: 2,
        borderColor: Colors.disabled,
        borderRadius: 12,
        paddingVertical: 16,
    },
    optionSelected: {
        borderColor: Theme.autumnGreenDarkToautumnGreen,
    },
    previewBox: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.orangeToBlue,
        borderRadius: 8,
        paddingBottom: 14,
        marginHorizontal: 12,
    },
});
