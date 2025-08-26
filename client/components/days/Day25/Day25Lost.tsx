import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RateButton } from "@/components/utils/buttons/RateButton";
import { Snowfall } from "@/components/utils/Snow";
import { Colors } from "@/constants/Colors";

export const Day25Lost = () => {
    return (
        <>
            <Snowfall count={100} />
            <View style={{ paddingHorizontal: 20 }}>
                <ThemedText type="pallyBoldSnow" style={styles.title}>
                    Dommage 😔
                </ThemedText>
                <ThemedText style={styles.text}>
                    Vous n'avez pas atteint les 2512 points requis pour accéder
                    à la surprise...
                </ThemedText>
                <ThemedText style={styles.text}>
                    Retentez votre chance l'année prochaine !
                </ThemedText>

                <Image
                    source={{
                        uri: "https://media.giphy.com/media/3o6wrywE9d1SJNd0wU/giphy.gif",
                    }}
                    style={styles.gif}
                />

                <ThemedText style={styles.text}>
                    J'espère tout de même que l'application vous aura plu...
                </ThemedText>
                <ThemedText style={styles.text}>
                    ...et si c'est le cas, n'hésitez pas à laisser un avis sur
                    le Play Store 😊
                </ThemedText>
                <RateButton style={{ marginTop: 10 }}>J'y vais !</RateButton>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingBottom: 20,
    },
    text: { color: Colors.snow, paddingVertical: 5 },
    gif: {
        width: 300,
        height: 180,
        marginBottom: 20,
        marginTop: 10,
    },
});
