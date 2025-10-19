import { Tabs, router } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.blue,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.snow,
                },
                tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Décompte",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "sparkles" : "sparkles-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendrier",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "gift" : "gift-outline"}
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.replace("/calendar");
                    },
                }}
            />
            <Tabs.Screen
                name="bingo"
                options={{
                    title: "Bingo",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={
                                focused
                                    ? "heart-circle"
                                    : "heart-circle-outline"
                            }
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.replace("/bingo");
                    },
                }}
            />
            <Tabs.Screen
                name="scores"
                options={{
                    title: "Scores",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={
                                focused
                                    ? "game-controller"
                                    : "game-controller-outline"
                            }
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.replace("/scores");
                    },
                }}
            />
            <Tabs.Screen
                name="informations"
                options={{
                    title: "Infos",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "snow" : "snow-outline"}
                            color={color}
                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.replace("/informations");
                    },
                }}
            />
        </Tabs>
    );
}
