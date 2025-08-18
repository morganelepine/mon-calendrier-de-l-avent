import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Gift25 } from "@/components/days/Day25/Gift25";
import { Snowfall } from "@/components/utils/Snow";
import { Colors } from "@/constants/Colors";
import { gifts_day25 } from "@/data/gifts_day25_data";

interface Day25Props {
    totalScore: number;
}

export const Day25Win: React.FC<Day25Props> = ({ totalScore }) => {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Snowfall count={200} />

            <View style={{ marginTop: insets.top * 2, paddingHorizontal: 20 }}>
                <View>
                    <ThemedText style={styles.title}>🎅 Joyeux Noël</ThemedText>
                    <ThemedText style={styles.title}>et BRAVO !</ThemedText>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <ThemedText style={styles.text}>
                        Vous avez gagné {totalScore} points et pouvez donc
                        accéder à la surprise !
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Elle se cache derrière l'un de ces cadeaux...
                        Choisirez-vous le bon ?
                    </ThemedText>
                </View>
            </View>
            <View style={styles.giftsContainer}>
                {gifts_day25.map((gift) => (
                    <Gift25 key={gift.id} gift={gift} />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "PallyBold",
        fontSize: 30,
        textAlign: "center",
        letterSpacing: 3,
        color: Colors.snow,
    },
    text: { color: Colors.snow },
    giftsContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});
