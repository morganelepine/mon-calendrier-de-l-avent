import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Rules } from "@/components/score/Rules";

export default function RulesScreen() {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <Rules />
        </ScrollView>
    );
}
