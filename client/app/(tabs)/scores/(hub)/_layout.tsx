import { View } from "react-native";
import { Tabs } from "expo-router";
import { ScoresTabBar } from "@/components/navigation/ScoresTabBar";

// Mes scores / Mon groupe / Top / Mon classement as one page, no header:
// the tab row renders in normal flow above a headless nested Tabs navigator.
export default function ScoresHubLayout() {
    return (
        <View style={{ flex: 1 }}>
            <ScoresTabBar />
            <Tabs screenOptions={{ headerShown: false }} tabBar={() => null}>
                <Tabs.Screen name="index" />
                <Tabs.Screen name="group" />
                <Tabs.Screen name="top" />
                <Tabs.Screen name="mine" />
            </Tabs>
        </View>
    );
}
