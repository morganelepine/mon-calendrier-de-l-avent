import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const BingoRules = () => {
    return (
        <>
            <View style={styles.section}>
                <ThemedText type="sectionText" style={styles.ital}>
                    Vous adorez les téléfilms de Noël avec leurs histoires
                    prévisibles, mais réconfortantes, où l’esprit de Noël est
                    toujours au rendez-vous ? Pour rendre hommage à cette
                    passion dévorante et apprécier à leur juste valeur les
                    clichés de ces films, j’ai créé le Bingo des téléfilms de
                    Noël !
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
                    ▪️ En cliquant sur le bouton 🔄, vous pouvez générer une
                    nouvelle grille avec de nouvelles situations.
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
        </>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    ital: {
        fontFamily: "PoppinsItalic",
    },
});
