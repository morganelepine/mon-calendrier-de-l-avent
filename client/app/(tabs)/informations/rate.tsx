import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { CustomButton } from "@/components/utils/buttons/Button";
import { ExternalLinkButton } from "@/components/utils/buttons/ExternalLinkButton";
import { Separator } from "@/components/utils/Separator";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";
import {
    PLAY_STORE_URL,
    CONTACT_FORM_URL,
    SATISFACTION_SURVEY_URL,
} from "@/constants/Links";

export default function RateScreen() {
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
                <ThemedText
                    type="sectionText"
                    style={{ fontFamily: "PoppinsBold" }}
                >
                    Votre avis est précieux
                </ThemedText>
                <ThemedText type="sectionText">
                    Votre avis compte beaucoup pour moi. Alors si vous appréciez
                    cette application, prenez un moment pour laisser un avis sur
                    le Play Store !
                </ThemedText>
                <ThemedText type="sectionText">
                    PS : n'oubliez pas que, derrière l'écran, il y a un être
                    humain qui a passé énormément de temps à développer cette
                    application et à en créer son contenu...
                </ThemedText>
                <ThemedText type="sectionText">
                    Merci pour votre soutien !
                </ThemedText>
                <ExternalLinkButton url={PLAY_STORE_URL}>
                    Laisser un avis
                </ExternalLinkButton>

                {isOctober && (
                    <>
                        <Separator />

                        <ThemedText
                            type="sectionText"
                            style={{ fontFamily: "PoppinsBold" }}
                        >
                            Quelques minutes devant vous ?
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Répondez à un mini questionnaire de satisfaction :
                            vos réponses m'aideront à rendre ce calendrier
                            encore plus cosy-spooky !
                        </ThemedText>
                        <ExternalLinkButton
                            url={SATISFACTION_SURVEY_URL}
                            color={Theme.goldToBlue}
                        >
                            Répondre au questionnaire
                        </ExternalLinkButton>
                    </>
                )}

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
                <CustomButton
                    onPress={() => Linking.openURL(CONTACT_FORM_URL)}
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
