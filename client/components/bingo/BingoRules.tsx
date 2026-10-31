import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SeasonalSections } from "@/components/utils/SeasonalSections";

const HalloweenRules = () => (
    <View>
        <ThemedText type="sectionTitle">Mon calendrier de l'automne</ThemedText>
        <ThemedText type="sectionDates">Du 1er au 31 octobre</ThemedText>

        <ThemedText type="sectionSubtitle">
            Bingo d'automne &amp;&nbsp;Halloween
        </ThemedText>

        <View style={styles.section}>
            <ThemedText type="sectionText">
                Ce bingo contient une bucket list d'activités typiquement
                automnales et d'Halloween.
            </ThemedText>
            <ThemedText type="sectionText">
                Chaque fois que vous réalisez l'une de ces activités, cliquez
                sur la case correspondante pour la valider.
            </ThemedText>
            <ThemedText type="sectionText">
                Rien à gagner ici, juste le plaisir de profiter de l'automne à
                fond.
            </ThemedText>
        </View>
    </View>
);

export const MoviesBingoRules = () => (
    <View style={styles.section}>
        <ThemedText type="sectionText">
            Une sélection de films de Noël pour tous les goûts pour se mettre
            immédiatement dans l'ambiance !
        </ThemedText>
        <ThemedText type="sectionText">
            Chaque fois que vous regardez l’un de ces films, il vous suffit de
            cliquer sur la case correspondante pour la valider.
        </ThemedText>
    </View>
);

export const TelefilmsBingoRules = () => (
    <View>
        <View style={styles.section}>
            <ThemedText type="sectionText">Le principe est simple :</ThemedText>
            <ThemedText type="sectionText">
                ▪️ Installez-vous confortablement devant le téléfilm du jour.
            </ThemedText>
            <ThemedText type="sectionText">
                ▪️ Ouvrez la grille remplie de 28 situations typiques que l’on
                retrouve dans nombreux téléfilms de Noël.
            </ThemedText>
            <ThemedText type="sectionText">
                ▪️ À chaque fois qu’une des situations se produit (comme "Un
                personnage revient dans sa ville natale" ou "Une tempête de
                neige empêche le personnage de rentrer"), cliquez sur la case
                correspondante.
            </ThemedText>
        </View>
        <ThemedText type="sectionText">
            Il vous suffit de recliquer sur les cases pour recommencer le bingo
            de zéro.
        </ThemedText>
    </View>
);

export const ActivitiesBingoRules = () => (
    <View style={styles.section}>
        <ThemedText type="sectionText">
            Une bucket list d'activités typiquement hivernales pour profiter à
            fond du mois de décembre !
        </ThemedText>
        <ThemedText type="sectionText">
            Chaque fois que vous réalisez l’une de ces activités, il vous suffit
            de cliquer sur la case correspondante pour la valider.
        </ThemedText>
        <ThemedText type="sectionText">
            L’objectif ? S’amuser, se créer de beaux souvenirs et peut-être même
            réussir à compléter toute la grille avant Noël !
        </ThemedText>
    </View>
);

const ChristmasRules = () => (
    <View>
        <ThemedText type="sectionTitle">Mon calendrier de l'avent</ThemedText>
        <ThemedText type="sectionDates">À partir du 1er novembre</ThemedText>

        <ThemedText type="sectionSubtitle">Bingo des films de Noël</ThemedText>
        <MoviesBingoRules />

        <ThemedText type="sectionSubtitle">
            Bingo des téléfilms de Noël
        </ThemedText>
        <TelefilmsBingoRules />

        <ThemedText type="sectionSubtitle" style={{ marginTop: 20 }}>
            Bingo des activités de Noël
        </ThemedText>
        <ActivitiesBingoRules />
    </View>
);

export const BingoRules = () => {
    return (
        <SeasonalSections
            autumn={<HalloweenRules />}
            christmas={<ChristmasRules />}
        />
    );
};

const styles = StyleSheet.create({
    section: {
        marginVertical: 10,
    },
});
