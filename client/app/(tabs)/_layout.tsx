import { Tabs, router } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Theme.orangeToBlue,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.snow,
                },
                // Explicit lineHeight: the "Poppins" webfont's own line
                // metrics are taller than react-navigation's fixed-height
                // tab bar row assumes, which was clipping the label text.
                tabBarLabelStyle: {
                    fontFamily: "Poppins",
                    fontSize: 10,
                    lineHeight: 12,
                },
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
                                        ? "skull" // ghost
                                        : "skull-outline"
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
                                        ? "leaf" // spider
                                        : "leaf-outline"
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
                    title: "Activités",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={
                                isOctober
                                    ? "bug-outline" // pumpkin
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
                                        ? "umbrella" // skull
                                        : "umbrella-outline"
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
                                        ? "nutrition" // emoticon-devil
                                        : "nutrition-outline"
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
