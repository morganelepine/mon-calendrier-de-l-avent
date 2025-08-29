import { ScrollView, StyleSheet } from "react-native";
import { AppContent } from "@/components/informations/AppContent";

export default function ContentScreen() {
    return (
        <ScrollView style={styles.container}>
            <AppContent />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
});
