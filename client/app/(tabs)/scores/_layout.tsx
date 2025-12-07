import { CustomHeader } from "@/components/navigation/CustomHeader";
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
                            <CustomHeader
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
                            <CustomHeader
                                title="Mon groupe"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                                page={"group"}
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
                            <CustomHeader
                                title="Ajouter des membres"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                                page={"addMembers"}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
