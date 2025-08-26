import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Wallpapers } from "@/components/days/Day25/Wallpapers";
import { RateButton } from "@/components/utils/buttons/RateButton";
import { ExternalLink } from "@/components/utils/ExternalLink";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

export default function Day25Screen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{
                light: Colors.snow,
                dark: Colors.darkGreen,
            }}
            headerImage={
                <Image
                    source={{
                        uri: getCloudinaryImageUrl("sapin-rouge_idzwwr"),
                    }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedText style={styles.title}>
                Merci d'être resté·e jusqu'au bout 🎅
            </ThemedText>

            <View>
                <View style={styles.section}>
                    <ThemedText style={styles.text}>
                        J'espère de tout cœur que cette application aura réussi
                        à ajouter une touche de magie à votre mois de décembre
                        et à vous plonger dans l'ambiance de Noël ☃️
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Si vous avez apprécié mon application, rendez-vous
                        l'année prochaine pour de nouvelles surprises ✨
                    </ThemedText>

                    <ThemedText style={styles.text}>
                        Mais avant ça, cela me toucherait énormément si vous
                        preniez le temps de laisser un avis sur le Play Store :
                    </ThemedText>
                    <RateButton style={styles.button}>J'y vais !</RateButton>

                    <ThemedText style={styles.text}>
                        Et maintenant, place aux cadeaux ! 🎁
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🖼️ Six fonds d'écran
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Ces dessins ont également été créés par Annaëlle pour
                        pouvoir profiter encore un peu de l'ambiance de Noël.
                    </ThemedText>
                    <ThemedText type="sectionText" style={styles.explanations}>
                        Cliquez sur une image pour l'afficher en grand puis
                        faites une capture d'écran et redimensionnez si
                        nécessaire !
                    </ThemedText>
                    <Wallpapers />
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        📺 Le bingo des téléfilms de Noël
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Vous avez aimé joué au bingo des téléfilms de Noël ?
                        Voici une version à imprimer !
                    </ThemedText>
                    <View style={styles.imageContainer}>
                        <ExternalLink
                            href={"https://bit.ly/bingo-de-noel"}
                            style={styles.image}
                        >
                            <View style={styles.thumbnail}>
                                <Image
                                    source={{
                                        uri: getCloudinaryImageUrl(
                                            "bingo_blanc_rvflsz"
                                        ),
                                    }}
                                    resizeMode="cover"
                                    style={styles.thumbnail}
                                />
                            </View>
                        </ExternalLink>
                        <ThemedText
                            type="sectionText"
                            style={styles.explanations}
                        >
                            Cliquez sur l'image pour la télécharger puis
                            l'imprimer au format A5 !
                        </ThemedText>
                    </View>
                </View>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    title: {
        fontSize: 26,
        letterSpacing: 2,
        color: Colors.green,
        fontFamily: "PallyBold",
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 34,
    },
    section: {
        marginBottom: 30,
    },
    text: {
        color: Colors.darkBlue,
        paddingVertical: 5,
        textAlign: "left",
        paddingHorizontal: 20,
    },
    button: { marginTop: 10, marginBottom: 20, alignSelf: "center" },
    imageContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    image: { marginRight: 10 },
    thumbnail: {
        width: 150,
        height: 210,
        borderRadius: 5,
        marginBottom: 15,
    },
    explanations: {
        fontSize: 14,
        marginTop: 5,
        fontFamily: "PoppinsItalic",
        flex: 1,
    },
});
