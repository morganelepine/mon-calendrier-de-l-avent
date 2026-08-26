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
            {/* Mes scores / Mon groupe / Top / Mon classement */}
            <Stack.Screen name="(hub)" options={{ headerShown: false }} />
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
