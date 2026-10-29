import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { slideStyles } from "@/components/retrospective/slides/slideStyles";

export const IntroSlide: React.FC<{ year: number }> = ({ year }) => (
    <>
        <ThemedText style={slideStyles.kicker}>Votre Avent {year}</ThemedText>
        <ThemedText style={slideStyles.title}>
            Revivez votre mois de décembre en quelques chiffres
        </ThemedText>
        <ThemedText style={styles.hint}>
            Touchez l'écran{"\n"}pour continuer
        </ThemedText>
    </>
);

const styles = StyleSheet.create({
    hint: {
        fontSize: 12,
        color: "rgba(1,15,35,0.6)",
        textAlign: "center",
        marginTop: 40,
        fontFamily: "PoppinsItalic",
    },
});
