import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { BingoRules } from "@/components/bingo/BingoRules";

export default function BingoRulesScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView>
                <BingoRules />
            </SafeAreaView>
        </CustomScrollView>
    );
}
