import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { AppContent } from "@/components/informations/AppContent";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";

export default function ContentScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView edges={NO_TOP_EDGES} style={{ paddingTop: 20 }}>
                <AppContent />
            </SafeAreaView>
        </CustomScrollView>
    );
}
