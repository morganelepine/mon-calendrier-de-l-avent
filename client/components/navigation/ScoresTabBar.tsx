import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";

const TABS = [
    { label: "Mes scores", href: "/scores" },
    { label: "Mon groupe", href: "/scores/group" },
    { label: "Top", href: "/scores/top" },
    { label: "Mon classement", href: "/scores/mine" },
] as const;

export const ScoresTabBar = () => {
    const pathname = usePathname();

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {TABS.map((tab) => {
                    const focused = pathname === tab.href;
                    return (
                        <Pressable
                            key={tab.href}
                            onPress={() => router.navigate(tab.href)}
                            style={[styles.pill, focused && styles.pillActive]}
                        >
                            <ThemedText
                                style={[
                                    styles.label,
                                    focused && styles.labelActive,
                                ]}
                            >
                                {tab.label}
                            </ThemedText>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Theme.surface,
    },
    container: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 8,
    },
    pill: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.snow,
        backgroundColor: Colors.snow,
        opacity: 0.8,
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    pillActive: {
        backgroundColor: Theme.green,
        opacity: 1,
    },
    label: {
        color: Theme.tint,
        textAlign: "center",
        fontSize: 13,
    },
    labelActive: {
        color: Colors.snow,
        fontFamily: "PoppinsBold",
    },
});
