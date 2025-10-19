import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppContent } from "@/components/informations/AppContent";

export default function ContentScreen() {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <AppContent />
        </ScrollView>
    );
}
