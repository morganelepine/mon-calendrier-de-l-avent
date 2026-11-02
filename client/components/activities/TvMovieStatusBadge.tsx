import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export type TvMovieStatus = "live" | "next" | "tomorrow";

const LABELS: Record<TvMovieStatus, string> = {
    live: "En cours",
    next: "À suivre",
    tomorrow: "Demain",
};

export const TvMovieStatusBadge: React.FC<{ status: TvMovieStatus }> = ({
    status,
}) => (
    <View style={styles.badge}>
        {status === "live" ? <View style={styles.liveDot} /> : null}
        <ThemedText style={styles.text}>{LABELS[status]}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    badge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 6,
        backgroundColor: Colors.red,
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingTop: 2,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.snow,
    },
    text: {
        fontSize: 12,
        fontFamily: "PoppinsBold",
        color: Colors.snow,
        paddingTop: 1,
        textTransform: "uppercase",
    },
});
