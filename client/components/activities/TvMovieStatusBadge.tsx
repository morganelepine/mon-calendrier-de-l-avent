import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export const TvMovieStatusBadge: React.FC<{ live: boolean }> = ({ live }) => (
    <View style={styles.badge}>
        {live ? <View style={styles.liveDot} /> : null}
        <ThemedText style={styles.text}>
            {live ? "En cours" : "À suivre"}
        </ThemedText>
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
