import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { usePremium } from "@/contexts/PremiumContext";

// Approximate height of a single-line title badge, used to make it straddle
// the top edge of the card (half inside, half outside).
const BADGE_HEIGHT = 38;

interface PremiumFeatureCardProps {
    title: string;
    color: string;
    description: ReactNode;
    children?: ReactNode;
}

export const PremiumFeatureCard = ({
    title,
    color,
    description,
    children,
}: PremiumFeatureCardProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.badge, { borderColor: color }]}>
                <ThemedText style={[styles.badgeText, { color }]}>
                    {title}
                </ThemedText>
            </View>

            <View style={[styles.card, { backgroundColor: color }]}>
                <ThemedText type="sectionText" style={styles.description}>
                    {description}
                </ThemedText>
                {children}
            </View>
        </View>
    );
};

// White inset for interactive content that keeps its regular colors.
export const PremiumFeaturePanel = ({ children }: { children: ReactNode }) => {
    const { isPremium } = usePremium();

    return (
        <View style={styles.panel}>
            {!isPremium && (
                <View style={styles.lockedNotice}>
                    <Ionicons
                        name="lock-closed"
                        size={12}
                        color={Colors.autumnGreen}
                    />
                    <ThemedText style={styles.lockedNoticeText}>
                        Personnalisable avec la Hotte Magique
                    </ThemedText>
                </View>
            )}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 8,
    },
    badge: {
        alignSelf: "center",
        maxWidth: "85%",
        minHeight: BADGE_HEIGHT,
        justifyContent: "center",
        backgroundColor: Colors.snow,
        borderWidth: 1,
        borderRadius: BADGE_HEIGHT / 2,
        paddingHorizontal: 18,
        zIndex: 1,
    },
    badgeText: {
        fontFamily: "FreightNeoBold",
        fontSize: 17,
        paddingBottom: 4,
        textAlign: "center",
    },
    card: {
        marginTop: -BADGE_HEIGHT / 2,
        paddingTop: BADGE_HEIGHT / 2 + 12,
        paddingBottom: 16,
        borderRadius: 16,
    },
    description: {
        color: Colors.snow,
    },

    panel: {
        backgroundColor: Colors.snow,
        borderRadius: 12,
        marginHorizontal: 12,
        marginTop: 12,
        paddingVertical: 8,
    },
    lockedNotice: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    lockedNoticeText: {
        fontSize: 12,
        fontFamily: "PoppinsItalic",
        color: Colors.autumnGreen,
    },
});
