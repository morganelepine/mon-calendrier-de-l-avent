import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import { activityCardBase } from "@/components/activities/activityStyles";
import { Colors } from "@/constants/Colors";
import { DailySong } from "@/constants/DailySongs";

export const DailySongCard: React.FC<{ song: DailySong }> = ({ song }) => {
    const subtitle = song.artist
        ? `${song.artist} · ${song.title}`
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
    card: {
        ...activityCardBase,
        backgroundColor: "#EEF0F2",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    texts: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: "FreightNeoBold",
        color: Colors.autumnGold,
        paddingTop: 0,
    },
    subtitle: {
        fontSize: 13,
        paddingTop: 0,
    },
});
