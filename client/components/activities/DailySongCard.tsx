import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import {
    activityRowCard,
    activityRowSubtitle,
    activityRowTitle,
} from "@/components/activities/activityStyles";
import { Colors } from "@/constants/Colors";
import { DailySong } from "@/constants/DailySongs";

export const DailySongCard: React.FC<{ song: DailySong }> = ({ song }) => {
    const subtitle = song.artist
        ? `${song.title} · ${song.artist}`
        : song.title;

    return (
        <View style={styles.card}>
            <ActivityIcon
                image={"bell-white_j4vulo"}
                backgroundColor={Colors.autumnGold}
                size={44}
            />
            <View style={styles.texts}>
                <ThemedText style={styles.title} accessibilityRole="header">
                    La chanson du jour
                </ThemedText>
                <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: activityRowCard,
    texts: {
        flex: 1,
    },
    title: {
        ...activityRowTitle,
        color: Colors.autumnGold,
    },
    subtitle: activityRowSubtitle,
});
