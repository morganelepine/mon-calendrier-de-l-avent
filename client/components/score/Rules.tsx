import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SeasonalSections } from "@/components/utils/SeasonalSections";

const AutumnRules = () => (
    <View style={styles.section}>
        <ThemedText type="sectionTitle">Mon calendrier de l'automne</ThemedText>
        <ThemedText type="sectionDates">Du 1er au 31 octobre</ThemedText>

        <ThemedText type="sectionText">
            Le calendrier de l'automne ne permet pas de gagner des points.
        </ThemedText>
    </View>
);

const ChristmasRules = () => (
    <View>
        <View style={styles.section}>
            <ThemedText type="sectionTitle">
                Mon calendrier de l'avent
            </ThemedText>
            <ThemedText type="sectionDates">Du 1er au 25 décembre</ThemedText>

            <ThemedText type="sectionText">
                Chaque jour de décembre, vous pouvez accumuler des points pour
                tenter d'accéder à une petite surprise le 25 décembre !
            </ThemedText>
        </View>

        <View style={styles.section}>
            <ThemedText type="sectionSubtitle">
                Ouverture de la case du jour
            </ThemedText>
            <ThemedText type="sectionText">
                Ouvrir la case du jour vous rapporte
                <Text style={styles.bold}> 40 points </Text>
                si elle est ouverte le jour même.
            </ThemedText>
            <ThemedText type="sectionText">
                Si vous ouvrez la case en retard, vous ne gagnerez{" "}
                <Text style={styles.bold}>aucun point </Text>!
            </ThemedText>
        </View>

        <View style={styles.section}>
            <ThemedText type="sectionSubtitle">
                Découverte des contenus
            </ThemedText>
            <ThemedText type="sectionText">
                Chaque jour, explorez jusqu'à 4 types de contenus (une histoire,
                une anecdote, une recommandation, un jeu).
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
            <ThemedText type="sectionSubtitle">Réponse à un jeu</ThemedText>
            <ThemedText type="sectionText">
                Pour chaque bonne réponse donnée au jeu du jour (3 maximum),
                vous gagnez
                <Text style={styles.bold}> 15 points</Text>.
            </ThemedText>
            <ThemedText type="sectionText">
                Si vous participez aux jeux en retard, vous ne gagnez que
                <Text style={styles.bold}> 5 points</Text>.
            </ThemedText>
        </View>

        <View style={styles.section}>
            <ThemedText type="sectionSubtitle">
                Construire sa guirlande
            </ThemedText>
            <ThemedText type="sectionText">
                Chaque jour, accrochez une boule à votre guirlande en cliquant
                sur la boule du jour dans l'onglet{" "}
                <Text style={styles.bold}>Scores &gt; Mes scores</Text>.
            </ThemedText>
            <ThemedText type="sectionText">
                Toutes les 4 boules accrochées d'affilée, vous gagnez un bonus
                qui augmente avec la longueur de la guirlande :
                <Text style={styles.bold}> 10 points</Text> à la 4e boule,
                <Text style={styles.bold}> 20 points</Text> à la 8e,
                <Text style={styles.bold}> 30 points</Text> à la 12e... jusqu'à
                <Text style={styles.bold}> 60 points</Text> le 24 décembre.
            </ThemedText>
            <ThemedText type="sectionText">
                La couleur des boules dépend du nombre de points que vous avez
                gagné dans la journée.
            </ThemedText>
            <ThemedText type="sectionText">
                Si vous oubliez d'accrocher la boule d'un jour, votre guirlande
                se casse et repart de zéro. Les bonus déjà gagnés restent
                cependant acquis.
            </ThemedText>
        </View>

        <View style={styles.section}>
            <ThemedText type="sectionSubtitle">
                Limite de points par jour
            </ThemedText>
            <ThemedText type="sectionText">
                Vous pouvez ainsi accumuler jusqu'à
                <Text style={styles.bold}> 165 points </Text>
                par jour :
            </ThemedText>
            <ThemedText type="sectionText">
                ▪️ <Text style={styles.bold}>40 points</Text> en ouvrant la case
                du jour
            </ThemedText>
            <ThemedText type="sectionText">
                ▪️ <Text style={styles.bold}>80 points</Text> en découvrant
                chaque contenus
            </ThemedText>
            <ThemedText type="sectionText">
                ▪️ <Text style={styles.bold}>45 points</Text> en répondant
                correctement aux jeux
            </ThemedText>
            <ThemedText type="sectionText">
                Les bonus de guirlande s'ajoutent à cette limite.
            </ThemedText>
        </View>

        <View>
            <ThemedText type="sectionSubtitle">Objectif atteint</ThemedText>
            <ThemedText type="sectionText">
                Et si le 25 décembre vous avez réussi à accumuler au moins
                <Text style={styles.bold}> 2512 points</Text>
                ... surprise !
            </ThemedText>
        </View>
    </View>
);

export const Rules = () => {
    return (
        <View>
            <SeasonalSections
                autumn={<AutumnRules />}
                christmas={<ChristmasRules />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    bold: {
        fontFamily: "PoppinsBold",
    },
});
