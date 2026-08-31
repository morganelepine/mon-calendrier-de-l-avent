import { View } from "react-native";
import { Tabs } from "expo-router";
import { Game2048LeaderboardTabBar } from "@/components/navigation/Game2048LeaderboardTabBar";

export default function Game2048LeaderboardLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Game2048LeaderboardTabBar />
            <Tabs screenOptions={{ headerShown: false }} tabBar={() => null}>
                <Tabs.Screen name="general" />
                <Tabs.Screen name="group" />
                <Tabs.Screen name="mine" />
            </Tabs>
        </View>
    );
}
