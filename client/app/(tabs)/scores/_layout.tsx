import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { GroupHeader } from "@/components/navigation/GroupHeader";
import { Colors, Theme } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function ScoresLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.snow,
                },
                headerTintColor: Theme.tint,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="leaderboard"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Classement"
                                backgroundColor={Colors.snow}
                                color={Theme.tint}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="group"
                options={{
                    header: () => {
                        return (
                            <GroupHeader
                                title="Mon groupe"
                                backgroundColor={Colors.snow}
                                color={Theme.tint}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="addMembers"
                options={{
                    header: () => {
                        return (
                            <GroupHeader
                                title="Ajouter des membres"
                                backgroundColor={Colors.snow}
                                color={Theme.tint}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
