import { Tabs, router } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Theme.tint,
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
                            name={
                                isOctober
                                    ? focused
                                        ? "ghost"
                                        : "ghost-outline"
                                    : focused
                                      ? "sparkles"
                                      : "sparkles-outline"
                            }
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
                            name={
                                isOctober
                                    ? focused
                                        ? "spider"
                                        : "spider-outline"
                                    : focused
                                      ? "gift"
                                      : "gift-outline"
                            }
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
                                isOctober
                                    ? "pumpkin"
                                    : focused
                                      ? "snow"
                                      : "snow-outline"
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
                                isOctober
                                    ? focused
                                        ? "skull"
                                        : "skull-outline"
                                    : focused
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
                            name={
                                isOctober
                                    ? focused
                                        ? "emoticon-devil"
                                        : "emoticon-devil-outline"
                                    : focused
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
                        router.replace("/informations");
                    },
                }}
            />
        </Tabs>
    );
}
