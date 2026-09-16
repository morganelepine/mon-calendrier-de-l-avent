import { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
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

export const CountdownVariantSettings = () => {
    const { isPremium } = usePremium();
    const [variant, setVariant] = useCountdownVariant();
    const [showSeconds, setShowSeconds] = useCountdownShowSeconds();
    const [targetDay, setTargetDay] = useChristmasTargetDay();
    const [showSettings, setShowSettings] = useState(false);

    const options: { variant: CountdownVariant; preview: ReactNode }[] = [
        {
            variant: CountdownVariant.Nights,
            preview: <NightsCountdown nights={DEMO_COUNTDOWN.days} />,
        },
        {
            variant: CountdownVariant.Columns,
            preview: (
                <ColumnsCountdown
                    {...DEMO_COUNTDOWN}
                    showSeconds={showSeconds}
                />
            ),
        },
    ];

    return (
        <View style={{ marginVertical: 8 }}>
            <ThemedText type="sectionSubtitle">
                Un compte à rebours à votre image
            </ThemedText>
            <ThemedText type="sectionText">
                Choisissez comment le décompte s'affiche sur l'écran d'accueil
                pendant le mois de décembre et décidez s’il vous accompagne
                jusqu’au 24 ou jusqu’au 25&nbsp;décembre.
            </ThemedText>

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
                    color={Colors.autumnGreen}
                />
            </TouchableOpacity>

            {showSettings && (
                <>
                    {!isPremium && (
                        <View style={styles.lockedNotice}>
                            <Ionicons
                                name="lock-closed"
                                size={14}
                                color={Colors.autumnGreen}
                            />
                            <ThemedText style={styles.lockedNoticeText}>
                                Personnalisable avec la Hotte Magique
                            </ThemedText>
                        </View>
                    )}

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
                        label={"Décompte jusqu'au 25 décembre"}
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
                </>
            )}
        </View>
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
        color: Colors.autumnGreen,
    },
    options: {
        paddingHorizontal: 20,
        gap: 12,
        marginVertical: 16,
    },
    disabled: {
        opacity: 0.6,
    },
    lockedNotice: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    lockedNoticeText: {
        fontSize: 13,
        fontFamily: "PoppinsItalic",
        color: Colors.autumnGreen,
    },
    option: {
        borderWidth: 2,
        borderColor: Colors.disabled,
        borderRadius: 12,
        paddingVertical: 16,
    },
    optionSelected: {
        borderColor: Theme.autumnGreen,
    },
    previewBox: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.tint,
        borderRadius: 8,
        paddingBottom: 20,
        marginHorizontal: 12,
    },
});
