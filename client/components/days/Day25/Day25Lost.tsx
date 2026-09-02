import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { Colors } from "@/constants/Colors";

export const Day25Lost = () => {
    return (
        <>
            <Snowfall count={100} />
            <View style={{ paddingHorizontal: 20 }}>
                <ThemedText type="freightNeoBoldSnow" style={styles.title}>
                    Vous y étiez presque&nbsp;!
                </ThemedText>
                <ThemedText style={styles.text}>
                    Le seuil de 2512 points n’a pas été atteint cette fois-ci,
                    mais votre parcours était impressionnant&nbsp;!
                </ThemedText>
                <ThemedText style={styles.text}>
                    Préparez-vous : la magie de Noël revient chaque année…
                </ThemedText>
                <ThemedText style={styles.text}>
                    Et les lutins comptent sur vous pour la prochaine mission ✨
                </ThemedText>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        paddingBottom: 20,
    },
    text: {
        color: Colors.snow,
        paddingVertical: 5,
        textAlign: "center",
    },
});
