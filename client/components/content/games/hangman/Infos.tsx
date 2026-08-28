import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Theme } from "@/constants/Colors";

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
        <View style={styles.container}>
            <View style={styles.infos}>
                <ThemedText style={styles.info}>
                    Mot : {currentWordIndex + 1} sur {words.length}
                </ThemedText>
            </View>
            <View style={styles.infos}>
                <ThemedText style={styles.info}>
                    {mistakes < 2 ? "Erreur : " : "Erreurs : "}
                    {mistakes} sur {maxTries}
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        marginVertical: 20,
        paddingBottom: 10,
        width: "100%",
    },
    infos: {
        flex: 1,
        // On web, flex items default to min-width: auto and refuse to
        // shrink below their content's width.
        minWidth: 0,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Theme.green,
    },
    info: {
        fontSize: 14,
        color: Theme.green,
        textAlign: "center",
    },
});
