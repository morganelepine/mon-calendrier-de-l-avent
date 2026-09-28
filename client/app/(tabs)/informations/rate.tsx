import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ExternalLinkButton } from "@/components/utils/buttons/ExternalLinkButton";
import { Separator } from "@/components/utils/Separator";
import { Colors, Theme } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function RateScreen() {
    const contactMe = () => {
        const url = "mailto:merrymerrymate@gmail.com";
        Linking.openURL(url);
    };

    return (
        <CustomScrollView>
            <SafeAreaView
                edges={NO_TOP_EDGES}
                style={{
                    backgroundColor: Colors.snow,
                    flex: 1,
                    gap: 8,
                    paddingTop: 20,
                }}
            >
                <ThemedText type="sectionText">
                    Votre avis compte beaucoup pour moi. Alors si vous appréciez
                    cette application, prenez un moment pour laisser un avis !
                </ThemedText>
                <ThemedText type="sectionText">
                    Cela me fera très plaisir et donnera peut-être envie à
                    d'autres utilisateur·ice·s de découvrir ce calendrier de
                    l'avent.
                </ThemedText>
                <ThemedText type="sectionText">
                    PS : n'oubliez pas que, derrière l'écran, il y a un être
                    humain qui a passé énormément de temps à développer cette
                    application et à en créer son contenu...
                </ThemedText>
                <ThemedText type="sectionText">
                    Merci pour votre soutien !
                </ThemedText>
                <ExternalLinkButton url="https://play.google.com/store/apps/details?id=com.merrymate.moncalendrierdelavent">
                    Laisser un avis
                </ExternalLinkButton>

                <Separator />

                <ThemedText
                    type="sectionText"
                    style={{ fontFamily: "PoppinsBold" }}
                >
                    Une idée, une suggestion, des remarques, un bug à signaler ?
                </ThemedText>
                <ThemedText type="sectionText">
                    Cette application évolue grâce aux retours que je reçois,
                    alors n’hésitez pas à m’écrire pour proposer une
                    amélioration, suggérer des contenus, signaler un problème,
                    partager votre avis...
                </ThemedText>
                <ThemedText type="sectionText">
                    Chaque message sera lu avec attention et m’aidera à
                    améliorer l’application. Merci de faire partie de l’aventure
                    !
                </ThemedText>
                <ThemedText type="sectionText">
                    PS : n'hésitez pas à préciser votre nom de lutin·e de Noël
                    dans le message !
                </ThemedText>
                <CustomButton
                    onPress={contactMe}
                    color={Theme.orangeToRed}
                    style={{ marginTop: 12 }}
                >
                    Me contacter
                </CustomButton>

                {/* <Separator /> */}

                {/* <ThemedText type="sectionText">
                    Mon calendrier de l'avent est fait avec amour, et j'aimerais
                    qu'il reste accessible à tout le monde (et surtout, sans pub).
                </ThemedText>
                <ThemedText type="sectionText">
                    Les serveurs qui font tourner l'application ont un coût en
                    revanche, et si elle réussit à vous apporter un peu de magie
                    chaque jour, votre soutien m'aiderait à la garder en vie ☕️
                </ThemedText>
                <ExternalLinkButton
                    color={Theme.orangeToBlue}
                    url="https://ko-fi.com/merrymate"
                >
                    Me soutenir
                </ExternalLinkButton> */}
            </SafeAreaView>
        </CustomScrollView>
    );
}
