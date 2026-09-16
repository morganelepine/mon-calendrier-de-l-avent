import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Gift25 } from "@/components/days/Day25/Gift25";
import { Snowfall } from "@/components/utils/Snow";
import { Colors } from "@/constants/Colors";
import { gifts_day25 } from "@/data/day-25-gifts/gifts_day25_data";

interface Day25Props {
    totalScore: number;
    isPremium: boolean;
}

export const Day25Win: React.FC<Day25Props> = ({ totalScore, isPremium }) => {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Snowfall count={200} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
            >
                <View
                    style={{
                        marginTop: insets.top * 2,
                        paddingHorizontal: 20,
                    }}
                >
                    <View>
                        <ThemedText
                            type="freightNeoBoldSnow"
                            style={styles.title}
                        >
                            Joyeux Noël ✨
                        </ThemedText>
                        {!isPremium && (
                            <ThemedText
                                type="freightNeoBoldSnow"
                                style={styles.title}
                            >
                                et BRAVO !
                            </ThemedText>
                        )}
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        {!isPremium && (
                            <ThemedText style={styles.text}>
                                Vous avez gagné {totalScore} points et pouvez
                                donc accéder à la surprise !
                            </ThemedText>
                        )}
                        <ThemedText style={styles.text}>
                            {isPremium
                                ? "La petite surprise du jour "
                                : "Elle "}
                            se cache derrière l'un de ces cadeaux...
                            Choisirez-vous le&nbsp;bon&nbsp;?
                        </ThemedText>
                    </View>
                </View>
                <View style={styles.giftsContainer}>
                    {gifts_day25.map((gift) => (
                        <Gift25 key={gift.id} gift={gift} />
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
    },
    text: { color: Colors.snow, textAlign: "center" },
    scroll: {
        flex: 1,
        width: "100%",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    giftsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});
