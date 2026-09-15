import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SettingsToggleRow } from "@/components/informations/settings/SettingsToggleRow";
import { NightsCountdown } from "@/components/calendar/Countdown/NightsCountdown";
import { ColumnsCountdown } from "@/components/calendar/Countdown/ColumnsCountdown";
import {
    useCountdownVariant,
    useCountdownShowSeconds,
    useChristmasTargetDay,
} from "@/contexts/CountdownVariantContext";
import { ChristmasTargetDay, CountdownVariant } from "@/enums/enums";
import { Colors, Theme } from "@/constants/Colors";

const DEMO_COUNTDOWN = { days: 12, hours: 15, minutes: 13, seconds: 1 };

export const CountdownVariantSettings = () => {
    const [variant, setVariant] = useCountdownVariant();
    const [showSeconds, setShowSeconds] = useCountdownShowSeconds();
    const [targetDay, setTargetDay] = useChristmasTargetDay();

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
        <>
            <ThemedText
                type="sectionText"
                style={{ fontFamily: "PoppinsBold" }}
            >
                Décompte avant Noël
            </ThemedText>
            <ThemedText type="sectionText">
                Choisissez comment le décompte s'affiche sur l'écran d'accueil
                pendant le mois de décembre.
            </ThemedText>

            <View style={styles.options}>
                {options.map(({ variant: optionVariant, preview }) => {
                    const selected = optionVariant === variant;

                    return (
                        <TouchableOpacity
                            key={optionVariant}
                            onPress={() => setVariant(optionVariant)}
                            style={[
                                styles.option,
                                selected && styles.optionSelected,
                            ]}
                        >
                            <View style={styles.previewBox}>{preview}</View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <SettingsToggleRow
                label={"Décompte jusqu'au 25 décembre"}
                value={targetDay === ChristmasTargetDay.Day}
                onValueChange={(value) =>
                    setTargetDay(
                        value ? ChristmasTargetDay.Day : ChristmasTargetDay.Eve,
                    )
                }
            />

            {variant !== CountdownVariant.Nights && (
                <SettingsToggleRow
                    label={"Afficher les secondes"}
                    value={showSeconds}
                    onValueChange={setShowSeconds}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    options: {
        paddingHorizontal: 20,
        gap: 12,
        marginVertical: 16,
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
