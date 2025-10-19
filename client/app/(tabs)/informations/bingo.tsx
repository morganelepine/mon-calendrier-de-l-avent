import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BingoRules } from "@/components/bingo/BingoRules";

export default function BingoRulesScreen() {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <BingoRules />
        </ScrollView>
    );
}
