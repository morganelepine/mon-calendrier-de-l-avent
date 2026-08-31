import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { PillTabBar } from "@/components/navigation/PillTabBar";
import { Theme } from "@/constants/Colors";
import { TOP_EDGES } from "@/constants/safeAreaEdges";

const TABS = [
    { key: "/scores", label: "Mes scores" },
    { key: "/scores/group", label: "Mon groupe" },
    { key: "/scores/top", label: "Top" },
    { key: "/scores/mine", label: "Mon classement" },
] as const;

export const ScoresTabBar = () => {
    const pathname = usePathname();

    return (
        <SafeAreaView edges={TOP_EDGES} style={styles.safeArea}>
            <PillTabBar
                items={TABS}
                activeKey={pathname}
                onSelect={(key) => router.navigate(key as never)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Theme.surface,
    },
});
