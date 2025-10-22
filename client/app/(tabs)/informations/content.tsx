import { SafeAreaView } from "react-native-safe-area-context";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { AppContent } from "@/components/informations/AppContent";

export default function ContentScreen() {
    return (
        <CustomScrollView>
            <SafeAreaView>
                <AppContent />
            </SafeAreaView>
        </CustomScrollView>
    );
}
