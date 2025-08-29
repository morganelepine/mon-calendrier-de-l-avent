import { Tabs } from "expo-router";
import React from "react";
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
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Décompte",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
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
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "gift" : "gift-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bingo"
                options={{
                    title: "Bingo",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
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
            />
            <Tabs.Screen
                name="scores"
                options={{
                    title: "Scores",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
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
            />
            <Tabs.Screen
                name="informations"
                options={{
                    title: "Infos",
                    tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 10 },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "snow" : "snow-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
