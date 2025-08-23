import { ScrollView, StyleSheet } from "react-native";
import { Rules } from "@/components/score/Rules";

export default function RulesScreen() {
    return (
        <ScrollView style={styles.container}>
            <Rules />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        marginBottom: 20,
    },
});
