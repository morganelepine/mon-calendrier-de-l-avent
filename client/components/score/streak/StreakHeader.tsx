import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { pluralize } from "@/utils/pluralize";

interface StreakHeaderProps {
    streak: number;
    checkedInToday: boolean;
}

export const StreakHeader: React.FC<StreakHeaderProps> = ({
    streak,
    checkedInToday,
}) => (
    <>
        <View style={styles.header}>
            <ThemedText style={styles.title}>
                {streak > 0
                    ? `${pluralize(streak, "boule")} sur votre guirlande`
                    : "Construisez votre guirlande"}
            </ThemedText>
        </View>
        {!checkedInToday && (
            <ThemedText style={styles.hint}>
                Cliquez sur la boule du jour pour l'accrocher à votre guirlande
                {"\u00A0"}!
            </ThemedText>
        )}
    </>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: "FreightNeoBold",
        color: Colors.red,
        fontSize: 20,
        paddingTop: 0,
    },
    hint: {
        paddingHorizontal: 20,
        fontSize: 13,
        fontFamily: "PoppinsItalic",
        color: Colors.blue,
        textAlign: "center",
    },
});
