import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface InfosProps {
    currentWordIndex: number;
    words: string[];
    mistakes: number;
    maxTries: number;
}

export const Infos: React.FC<InfosProps> = ({
    currentWordIndex,
    words,
    mistakes,
    maxTries,
}) => {
    return (
        <View style={styles.infos}>
            <ThemedText style={styles.info}>
                Mot : {currentWordIndex + 1} sur {words.length}
            </ThemedText>

            <ThemedText style={styles.info}>
                {mistakes < 2 ? "Erreur : " : "Erreurs : "}
                {mistakes} sur {maxTries}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    infos: {
        marginTop: 5,
        marginBottom: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: Colors.green,
        alignSelf: "center",
    },
    info: {
        fontSize: 16,
        color: Colors.green,
    },
});
