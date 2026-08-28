import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { BingoRules } from "@/components/bingo/BingoRules";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function BingoRulesScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={{ paddingTop: 20 }}>
                <BingoRules />
            </SafeAreaView>
        </CustomScrollView>
    );
}
