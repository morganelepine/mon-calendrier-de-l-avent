import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Separator } from "@/components/utils/Separator";

export const AppContent = () => {
    return (
        <View>
            <View style={styles.section}>
                <ThemedText type="sectionTitle">
                    Mon calendrier de l'automne
                </ThemedText>
                <ThemedText type="sectionDates">
                    Du 1er au 31 octobre
                </ThemedText>
                <ThemedText type="sectionText">
                    C'est nouveau : tout au long du mois d'octobre,
                    l'application se met aux couleurs de l'automne et
                    d'Halloween !
                </ThemedText>
                <ThemedText type="sectionText">
                    Au programme : un bingo spécial et un calendrier rempli de
                    petites surprises automnales (un contenu par jour).
                </ThemedText>
                <ThemedText type="sectionText">
                    Pas d'inquiétude : l'ambiance de Noël reviendra le 1er
                    novembre et le calendrier de l'avent démarrera le 1er
                    décembre.
                </ThemedText>
            </View>

            <Separator />

            <View style={styles.section}>
                <ThemedText type="sectionTitle">
                    Mon calendrier de l'avent
                </ThemedText>
                <ThemedText type="sectionDates">
                    Du 1er au 31 décembre
                </ThemedText>

                <ThemedText type="sectionText">
                    Chaque jour de décembre, plongez dans la magie de Noël et
                    découvrez :
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    Combien de nuits avant Noël ?
                </ThemedText>
                <ThemedText type="sectionText">
                    Un compte à rebours pour patienter jusqu'au 25 décembre.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">Une histoire</ThemedText>
                <ThemedText type="sectionText">
                    Un chapitre d'une nouvelle de Noël découpée en plusieurs
                    épisodes.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">Une anecdote</ThemedText>
                <ThemedText type="sectionText">
                    Une anecdote pour découvrir l'origine des traditions et de
                    l’histoire de Noël.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    Une recommandation
                </ThemedText>
                <ThemedText type="sectionText">
                    Livre, série, activité, recette... : une idée pour
                    accompagner vos journées et soirées d'hiver.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">Un mini-jeu</ThemedText>
                <ThemedText type="sectionText">
                    Un jeu pour mettre vos connaissances de Noël à l’épreuve.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    Mais ce n'est pas tout...
                </ThemedText>
                <ThemedText type="sectionText">
                    Ouvrir la case du jour, explorer les contenus, jouer aux
                    jeux... : plus vous participez, plus vous gagnez des points.
                    Et le 25 décembre, une petite surprise attend celles et ceux
                    qui auront accumulé assez de points !
                </ThemedText>
            </View>

            <ThemedText type="sectionTextItalic">
                J'ai mis tout mon amour de Noël dans ce calendrier et j'espère
                qu'il saura vous transporter dans cette magie des fêtes que
                j'aime tant.
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
});
