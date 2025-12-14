import { useState } from "react";
import { StyleSheet, View, Pressable, Linking } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { Wallpapers } from "@/components/days/Day25/Wallpapers";
import { RateButton } from "@/components/utils/buttons/RateButton";
import { ExternalLink } from "@/components/utils/ExternalLink";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { Horoscope } from "@/components/days/Day25/Horoscope";
import { Colors } from "@/constants/Colors";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import { wallpapers } from "@/data/wallpapers_data";
import { recipes } from "@/data/recipes_data";

export default function Day25Screen() {
    const [modalVisible, setModalVisible] = useState(false);
    const openStoryModal = async () => {
        setModalVisible(true);
    };

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
                    contentFit="cover"
                    cachePolicy="memory-disk"
                />
            }
        >
            <ThemedText style={styles.title}>Joyeux Noël ☃️</ThemedText>

            <View>
                <View style={styles.section}>
                    <ThemedText style={styles.text}>
                        J'espère que cette application aura réussi à ajouter une
                        touche de magie à votre mois de décembre et à vous
                        plonger dans l'ambiance de Noël !
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Si vous avez apprécié mon application, rendez-vous
                        l'année prochaine pour de nouvelles surprises ✨
                    </ThemedText>

                    <ThemedText style={styles.text}>
                        Mais avant ça, cela me toucherait énormément si vous
                        preniez le temps de laisser un avis sur le Play Store :
                    </ThemedText>
                    <RateButton style={styles.rateButton}>
                        J'y vais !
                    </RateButton>

                    <ThemedText style={styles.text}>
                        Et maintenant, place aux cadeaux ! 🎁
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🖼️ Des fonds d'écran
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Ces dessins ont été créés par mon amie Annaëlle pour
                        pouvoir profiter encore un peu de l'ambiance de Noël.
                    </ThemedText>
                    <ThemedText type="sectionText" style={styles.explanations}>
                        Cliquez sur une image pour l'afficher en grand puis
                        faites une capture d'écran et redimensionnez si
                        nécessaire !
                    </ThemedText>
                    <Wallpapers datas={wallpapers} type={"wallpapers"} />
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        ♉ L'horoscope du jour
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Que vous réserve cette journée de Noël ? Cliquez sur le
                        bouton ci-dessous pour le découvrir !
                    </ThemedText>
                    <Pressable style={styles.button} onPress={openStoryModal}>
                        <ThemedText style={{ color: Colors.red }}>
                            Lire l'horoscope
                        </ThemedText>
                    </Pressable>
                    <Horoscope
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🍽️ Des recettes
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Vous n'avez pas eu le temps de reproduire les recettes
                        lues dans le calendrier ? Voici des versions à imprimer
                        !
                    </ThemedText>
                    <ThemedText type="sectionText" style={styles.explanations}>
                        Cliquez sur le titre pour afficher la recette puis
                        faites une capture d'écran et redimensionnez si
                        nécessaire !
                    </ThemedText>
                    <Wallpapers datas={recipes} type={"recipes"} />
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🎲 Un template de jeu
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Le jeu des mimes vous a tenté ? Il est encore temps
                        d'imprimer ce template pour y jouer aujourd'hui !
                    </ThemedText>
                    <View style={styles.imageContainer}>
                        <ExternalLink
                            href={
                                "https://www.canva.com/design/DAG5hYYr3HI/AteVoi3dLSFREp_nndmbGg/view?utm_content=DAG5hYYr3HI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                            }
                        >
                            <View style={styles.thumbnail}>
                                <Image
                                    source={{
                                        uri: getCloudinaryImageUrl(
                                            "defis_mimes_o5mj3a"
                                        ),
                                    }}
                                    style={styles.thumbnail}
                                    contentFit="cover"
                                    cachePolicy="memory-disk"
                                />
                            </View>
                        </ExternalLink>
                        <ThemedText
                            type="sectionText"
                            style={styles.explanations}
                        >
                            Cliquez sur l'image pour accéder à mon template
                            Canva ! Imprimez ensuite 6 cartes par page en
                            recto/verso.
                        </ThemedText>
                    </View>
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
                            href={
                                "https://res.cloudinary.com/deauthz29/image/upload/v1732540131/bingo_blanc_rvflsz.png"
                            }
                        >
                            <View style={styles.thumbnail}>
                                <Image
                                    source={{
                                        uri: getCloudinaryImageUrl(
                                            "bingo_blanc_rvflsz"
                                        ),
                                    }}
                                    style={styles.thumbnail}
                                    contentFit="cover"
                                    cachePolicy="memory-disk"
                                />
                            </View>
                        </ExternalLink>
                        <ThemedText
                            type="sectionText"
                            style={styles.explanations}
                        >
                            Cliquez sur l'image pour la télécharger puis
                            imprimez-la au format A5 !
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🕵🏻‍♀️ Une enquête
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Bon, ce cadeau, il est plutôt pour moi ! J'ai créé un
                        petit questionnaire pour recueillir votre avis
                        (anonymement) sur l'application et ainsi vous proposer
                        une version qui vous conviendra au mieux ! Merci par
                        avance à celles et ceux qui prendront le temps d'y
                        répondre 🙏
                    </ThemedText>
                    <Pressable
                        style={styles.button}
                        onPress={() =>
                            Linking.openURL(
                                "https://forms.gle/8PwdwpqvP6aqpyap8"
                            )
                        }
                    >
                        <ThemedText style={{ color: Colors.red }}>
                            Répondre au questionnaire
                        </ThemedText>
                    </Pressable>
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
        color: Colors.blue,
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
    rateButton: { marginTop: 10, marginBottom: 20, alignSelf: "center" },
    imageContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    thumbnail: {
        width: 150,
        height: 212,
        borderRadius: 5,
        marginBottom: 15,
    },
    explanations: {
        fontSize: 14,
        marginTop: 5,
        fontFamily: "PoppinsItalic",
        flex: 1,
    },
    button: {
        marginTop: 8,
        marginBottom: 15,
        borderRadius: 50,
        paddingVertical: 2,
        paddingHorizontal: 28,
        borderWidth: 1,
        borderColor: Colors.red,
        alignSelf: "center",
    },
});
