import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { TextButton } from "@/components/utils/buttons/TextButton";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";

interface HubCardProps {
    title: string;
    description: string;
    color: string;
    route: string;
    buttonLabel?: string;
    onRulesPress?: () => void;
}

export const HubCard: React.FC<HubCardProps> = ({
    title,
    description,
    color,
    route,
    buttonLabel = "Jouer",
    onRulesPress,
}) => {
    return (
        <View style={styles.card}>
            <ThemedText style={[styles.cardTitle, { color }]}>
                {title}
            </ThemedText>
            <ThemedText style={styles.cardSubtitle}>{description}</ThemedText>
            <CustomButton
                onPress={() => router.push(`/bingo/${route}` as never)}
                color={color}
            >
                {buttonLabel}
            </CustomButton>
            {onRulesPress ? (
                <TextButton
                    onPress={onRulesPress}
                    textColor={color}
                    accessibilityLabel={`${title} : règles du jeu`}
                >
                    Règles du jeu
                </TextButton>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: Colors.snow,
        opacity: 0.9,
        gap: 4,
    },
    cardTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "FreightNeoBold",
    },
    cardSubtitle: {
        fontSize: 15,
        textAlign: "center",
    },
});
