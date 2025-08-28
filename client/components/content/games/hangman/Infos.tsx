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
    },
    infos: {
        flex: 1,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.green,
    },
    info: {
        fontSize: 14,
        color: Colors.green,
        textAlign: "center",
    },
});
