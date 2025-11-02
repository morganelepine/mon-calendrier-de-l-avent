import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const BingoRules = () => {
    return (
        <View>
            <ThemedText type="sectionSubtitle">
                Bingo des téléfilms de Noël
            </ThemedText>

            <View style={styles.section}>
                <ThemedText type="sectionText">
                    Vous adorez les téléfilms de Noël avec leurs histoires
                    prévisibles, mais réconfortantes, où l’esprit de Noël est
                    toujours au rendez-vous ?
                </ThemedText>
                <ThemedText type="sectionText">
                    Pour rendre hommage à cette passion dévorante et apprécier à
                    leur juste valeur les clichés de ces films, j’ai créé le
                    Bingo des téléfilms de Noël !
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionText">
                    Le principe est simple :
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ Une grille remplie de 12 situations typiques que l’on
                    retrouve dans nombreux téléfilms de Noël est proposée dans
                    l'onglet Bingo.
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ En cliquant sur "Générer une nouvelle grille", une
                    nouvelle grille sera créée avec de nouvelles situations.
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ Installez-vous confortablement devant le téléfilm du jour
                    (spoiler alert : les inédits passent chaque jour vers 14h
                    sur TF1 et M6…).
                </ThemedText>
                <ThemedText type="sectionText">
                    ▪️ À chaque fois qu’une des situations se produit (comme "Un
                    personnage revient dans sa ville natale" ou "Une tempête de
                    neige empêche le personnage de rentrer"), cliquez sur la
                    case correspondante.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionText">
                    Évidemment, plus vous cochez de cases, plus le téléfilm a de
                    chance d’atteindre le sommet du chef-d'oeuvre de Noël !
                </ThemedText>
            </View>

            <ThemedText type="sectionSubtitle" style={{ marginTop: 20 }}>
                Bingo des activités de Noël
            </ThemedText>

            <View style={styles.section}>
                <ThemedText type="sectionText">
                    Une bucket list d'activités typiquement hivernales pour
                    profiter à fond du mois de décembre !
                </ThemedText>
                <ThemedText type="sectionText">
                    Chaque fois que vous réalisez l’une de ces activités, il
                    vous suffit de cliquer sur la case correspondante pour la
                    valider.
                </ThemedText>
                <ThemedText type="sectionText">
                    L’objectif ? S’amuser, se créer de beaux souvenirs et
                    peut-être même réussir à compléter toute la grille avant
                    Noël !
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginVertical: 10,
    },
});
