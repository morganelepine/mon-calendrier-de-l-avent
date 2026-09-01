import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { CustomButton } from "@/components/utils/buttons/Button";

interface BingoCardProps {
    type: string;
    description: string;
    color: string;
    route: string;
}

export const BingoCard = ({
    type,
    description,
    color,
    route,
}: BingoCardProps) => {
    return (
        <View style={styles.card}>
            <ThemedText style={[styles.cardTitle, { color: color }]}>
                Bingo des {type} de&nbsp;Noël
            </ThemedText>
            <ThemedText style={styles.cardSubtitle}>{description}</ThemedText>
            <CustomButton
                onPress={() => router.push(`/bingo/${route}` as never)}
                color={color}
            >
                Jouer
            </CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: Colors.snow,
        opacity: 0.9,
        gap: 8,
    },
    cardTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "FreightNeoBold",
    },
    cardSubtitle: {
        fontSize: 14,
        textAlign: "center",
    },
});
