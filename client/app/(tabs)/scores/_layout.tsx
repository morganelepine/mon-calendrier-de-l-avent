import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { GroupHeader } from "@/components/navigation/GroupHeader";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function ScoresLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.snow,
                },
                headerTintColor: Colors.blue,
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
                                color={Colors.blue}
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
                                color={Colors.blue}
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
                                color={Colors.blue}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
