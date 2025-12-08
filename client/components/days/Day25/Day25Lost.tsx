import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Snowfall } from "@/components/utils/Snow";
import { Colors } from "@/constants/Colors";

export const Day25Lost = () => {
    return (
        <>
            <Snowfall count={100} />
            <View style={{ paddingHorizontal: 20 }}>
                <ThemedText type="pallyBoldSnow" style={styles.title}>
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
        fontSize: 30,
        paddingBottom: 20,
        textAlign: "center",
    },
    text: {
        color: Colors.snow,
        paddingVertical: 5,
        textAlign: "center",
        fontSize: 18,
    },
    gif: {
        width: 300,
        height: 180,
        marginBottom: 20,
        marginTop: 10,
    },
});
