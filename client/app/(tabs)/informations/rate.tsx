import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLinkButton } from "@/components/utils/buttons/ExternalLinkButton";
import { Separator } from "@/components/utils/Separator";
import { Colors, Theme } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function RateScreen() {
    return (
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
                Cela me fera très plaisir et donnera peut-être envie à d'autres
                utilisateur·ice·s de découvrir ce calendrier de l'avent.
            </ThemedText>
            <ThemedText type="sectionText">
                Merci pour votre soutien !
            </ThemedText>
            <ExternalLinkButton url="https://play.google.com/store/apps/details?id=com.merrymate.moncalendrierdelavent">
                Laisser un avis
            </ExternalLinkButton>

            <Separator />

            <ThemedText type="sectionText">
                Mon calendrier de l'avent est fait avec amour, et j'aimerais
                qu'il reste accessible à tout le monde (et surtout, sans pub).
            </ThemedText>
            <ThemedText type="sectionText">
                Les serveurs qui font tourner l'application ont un coût en
                revanche, et si elle réussit à vous apporter un peu de magie
                chaque jour, votre soutien m'aiderait à la garder en vie ☕️
            </ThemedText>
            <ExternalLinkButton
                color={Theme.tint}
                url="https://ko-fi.com/merrymate"
            >
                Me soutenir
            </ExternalLinkButton>
        </SafeAreaView>
    );
}
