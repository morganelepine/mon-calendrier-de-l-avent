import { ScrollView, StyleSheet } from "react-native";
import { BingoRules } from "@/components/bingo/BingoRules";

export default function BingoRulesScreen() {
    return (
        <ScrollView style={styles.container}>
            <BingoRules />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
});
