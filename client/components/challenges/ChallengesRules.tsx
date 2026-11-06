import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const ChallengesRules = () => (
    <View style={styles.section}>
        <ThemedText type="sectionText">
            Ho Ho Ho... Il semblerait que les lutins aient caché des défis
            mystères un peu partout dans l'application !
        </ThemedText>
        <ThemedText type="sectionText">
            Ils ont laissé derrière chacun d'eux un titre énigmatique et un
            indice volontairement vague. À vous de faire preuve de curiosité,
            d'explorer l'application et de laisser parler votre intuition pour
            percer leurs mystères.
        </ThemedText>
        <ThemedText type="sectionText">
            Pour chaque secret découvert, les lutins déposeront quelques points
            supplémentaires dans votre hotte.
        </ThemedText>
        <ThemedText type="sectionText">
            Alors, ouvrez l'œil, suivez les étoiles et laissez la magie opérer.
            On ne sait jamais où se cache le prochain défi !
        </ThemedText>
    </View>
);

const styles = StyleSheet.create({
    section: {
        marginVertical: 10,
    },
});
