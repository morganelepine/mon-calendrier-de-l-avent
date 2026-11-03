import { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { TextButton } from "@/components/utils/buttons/TextButton";
import { Separator } from "@/components/utils/Separator";
import { Colors, Theme } from "@/constants/Colors";
import { currentDay, currentMonth, isFakeToday } from "@/constants/Dates";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";
import { useUser } from "@/contexts/UserContext";
import { setStoredFakeDate } from "@/services/tests/fakeDate.service";
import {
    reloadApp,
    resetUser,
    resetCalendar,
} from "@/services/tests/testTools.service";

const MONTHS = [
    { index: 9, label: "Octobre" },
    { index: 10, label: "Novembre" },
    { index: 11, label: "Décembre" },
];

const PRESETS = [
    { month: 9, day: 1 },
    { month: 9, day: 10 },
    { month: 9, day: 31 },
    { month: 10, day: 1 },
    { month: 10, day: 30 },
    { month: 11, day: 1 },
    { month: 11, day: 24 },
    { month: 11, day: 25 },
    { month: 11, day: 26 },
];

const year = new Date().getFullYear();

const daysInMonth = (month: number): number =>
    new Date(year, month + 1, 0).getDate();

const formatDayMonth = (day: number, month: number): string =>
    `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}`;

const confirm = (message: string, onConfirm: () => void): void => {
    Alert.alert("Confirmation", message, [
        { text: "Annuler", style: "cancel" },
        { text: "Confirmer", style: "destructive", onPress: onConfirm },
    ]);
};

interface ChipProps {
    label: string;
    selected?: boolean;
    onPress: () => void;
    accessibilityLabel?: string;
}

const Chip = ({
    label,
    selected = false,
    onPress,
    accessibilityLabel,
}: ChipProps) => (
    <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ selected }}
        style={({ pressed }) => [
            styles.chip,
            selected && styles.chipSelected,
            pressed && styles.chipPressed,
        ]}
    >
        <ThemedText
            style={[styles.chipText, selected && styles.chipTextSelected]}
        >
            {label}
        </ThemedText>
    </Pressable>
);

export default function TestScreen() {
    const { username, userId } = useUser();
    const initialMonth = MONTHS.some((m) => m.index === currentMonth)
        ? currentMonth
        : 11;
    const [month, setMonth] = useState(initialMonth);
    const [day, setDay] = useState(
        Math.min(currentDay, daysInMonth(initialMonth)),
    );

    const selectMonth = (newMonth: number) => {
        setMonth(newMonth);
        setDay((d) => Math.min(d, daysInMonth(newMonth)));
    };

    const shiftDay = (delta: number) => {
        setDay((d) => Math.min(Math.max(d + delta, 1), daysInMonth(month)));
    };

    const applyDate = async (date: Date | null) => {
        setStoredFakeDate(date);
        await reloadApp();
    };

    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={styles.container}>
                <ThemedText type="sectionText" style={styles.title}>
                    Date simulée
                </ThemedText>
                <ThemedText type="sectionText">
                    {isFakeToday
                        ? `L'application se croit le ${formatDayMonth(currentDay, currentMonth)}.`
                        : "L'application utilise la date réelle."}
                </ThemedText>

                <View style={styles.row}>
                    {MONTHS.map((m) => (
                        <Chip
                            key={m.index}
                            label={m.label}
                            selected={month === m.index}
                            onPress={() => selectMonth(m.index)}
                        />
                    ))}
                </View>

                <View style={[styles.row, styles.dayRow]}>
                    <Chip
                        label="−"
                        accessibilityLabel="Jour précédent"
                        onPress={() => shiftDay(-1)}
                    />
                    <ThemedText
                        style={styles.selectedDate}
                        accessibilityLiveRegion="polite"
                    >
                        {formatDayMonth(day, month)}
                    </ThemedText>
                    <Chip
                        label="+"
                        accessibilityLabel="Jour suivant"
                        onPress={() => shiftDay(1)}
                    />
                </View>

                <View style={styles.row}>
                    {PRESETS.map((p) => (
                        <Chip
                            key={`${p.month}-${p.day}`}
                            label={formatDayMonth(p.day, p.month)}
                            accessibilityLabel={`Choisir le ${formatDayMonth(p.day, p.month)}`}
                            onPress={() => {
                                setMonth(p.month);
                                setDay(p.day);
                            }}
                        />
                    ))}
                </View>

                <CustomButton
                    style={styles.button}
                    onPress={() => applyDate(new Date(year, month, day))}
                >
                    Appliquer le {formatDayMonth(day, month)}
                </CustomButton>

                {isFakeToday && (
                    <TextButton onPress={() => applyDate(null)}>
                        Revenir à la date réelle
                    </TextButton>
                )}

                <Separator />

                <ThemedText type="sectionText" style={styles.title}>
                    Calendrier
                </ThemedText>
                <ThemedText type="sectionText">
                    Supprime les ouvertures du calendrier, l'état des jeux et
                    les objectifs célébrés.
                </ThemedText>

                <CustomButton
                    style={styles.button}
                    color={Theme.goldToBlue}
                    onPress={() => resetCalendar()}
                >
                    Réinitialiser le calendrier
                </CustomButton>

                <Separator />

                <ThemedText type="sectionText" style={styles.title}>
                    Utilisateur
                </ThemedText>
                <ThemedText type="sectionText">
                    {username} (id {userId})
                </ThemedText>
                <ThemedText type="sectionText">
                    Supprime toutes les données locales et crée un nouvel
                    utilisateur, comme après une réinstallation.
                </ThemedText>

                <CustomButton
                    style={styles.button}
                    color={Theme.orangeToRed}
                    onPress={() =>
                        confirm(
                            "Réinitialiser l'utilisateur ? Toutes les données locales seront perdues.",
                            resetUser,
                        )
                    }
                >
                    Réinitialiser l'utilisateur
                </CustomButton>
            </SafeAreaView>
        </CustomScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.snow, flex: 1, paddingTop: 20 },
    title: { fontFamily: "PoppinsBold" },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        paddingHorizontal: 20,
        marginTop: 12,
    },
    dayRow: { alignItems: "center" },
    selectedDate: {
        fontFamily: "PoppinsBold",
        fontSize: 18,
        minWidth: 64,
        textAlign: "center",
        color: Theme.orangeToBlue,
    },
    chip: {
        borderWidth: 1,
        borderColor: Theme.orangeToBlue,
        borderRadius: 50,
        paddingHorizontal: 14,
        minWidth: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    chipSelected: { backgroundColor: Theme.orangeToBlue },
    chipPressed: { opacity: 0.7 },
    chipText: { color: Theme.orangeToBlue, fontSize: 14 },
    chipTextSelected: { color: Colors.snow },
    button: { marginTop: 16 },
});
