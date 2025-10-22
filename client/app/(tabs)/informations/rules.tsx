import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { Rules } from "@/components/score/Rules";

export default function RulesScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView>
                <Rules />
            </SafeAreaView>
        </CustomScrollView>
    );
}
