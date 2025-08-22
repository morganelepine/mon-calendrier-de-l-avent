import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function RulesScreen() {
    return (
        <>
            <View style={styles.section}>
                <ThemedText type="sectionText" style={styles.ital}>
                    Chaque jour, vous pouvez accumuler des points pour tenter
                    d'accéder à une petite surprise le 25 décembre !
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    ✨ Ouverture de la case du jour
                </ThemedText>
                <ThemedText type="sectionText">
                    Ouvrir la case du jour vous rapporte
                    <Text style={styles.bold}> 40 points </Text>
                    si elle est ouverte le jour même.
                </ThemedText>
                <ThemedText type="sectionText">
                    Attention : si vous ouvrez la case en retard, vous ne
                    gagnerez <Text style={styles.bold}> aucun point </Text>!
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    📜 Découverte des contenus
                </ThemedText>
                <ThemedText type="sectionText">
                    Chaque jour, explorez jusqu'à 4 types de contenus (une
                    histoire, une anecdote, une recommandation, un jeu).
                </ThemedText>
                <ThemedText type="sectionText">
                    Pour chaque contenu découvert, vous gagnez
                    <Text style={styles.bold}> 20 points</Text>.
                </ThemedText>
                <ThemedText type="sectionText">
                    Si vous les ouvrez en retard, vous ne gagnez que
                    <Text style={styles.bold}> 10 points</Text>.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    🎮 Réponse à un jeu
                </ThemedText>
                <ThemedText type="sectionText">
                    Pour chaque bonne réponse donnée au jeu du jour (3 maximum),
                    vous gagnez
                    <Text style={styles.bold}> 20 points</Text>.
                </ThemedText>
                <ThemedText type="sectionText">
                    Si vous participez aux jeux en retard, vous ne gagnez que
                    <Text style={styles.bold}> 10 points</Text>.
                </ThemedText>
                <ThemedText type="sectionText" style={styles.ital}>
                    21 jours sur 24 vous permettront de gagner des points aux
                    jeux.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    🎯 Limite de points par jour
                </ThemedText>
                <ThemedText type="sectionText">
                    Vous pouvez ainsi accumuler jusqu'à
                    <Text style={styles.bold}> 180 points </Text>
                    par jour :
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ <Text style={styles.bold}>40 points</Text> en ouvrant la
                    case du jour
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ <Text style={styles.bold}>80 points</Text> en découvrant
                    chaque contenus
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ <Text style={styles.bold}>60 points</Text> en répondant
                    correctement aux jeux
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    🎅 Objectif atteint
                </ThemedText>
                <ThemedText type="sectionText">
                    Et si le 25 décembre vous avez réussi à accumuler au moins
                    <Text style={styles.bold}> 2512 points</Text>
                    ... surprise !
                </ThemedText>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    bold: {
        fontFamily: "PoppinsBold",
    },
    ital: {
        fontFamily: "PoppinsItalic",
    },
});
