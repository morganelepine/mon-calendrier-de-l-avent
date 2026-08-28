import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Rules } from "@/components/score/Rules";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function RulesScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={{ paddingTop: 20 }}>
                <Rules />
            </SafeAreaView>
        </CustomScrollView>
    );
}
