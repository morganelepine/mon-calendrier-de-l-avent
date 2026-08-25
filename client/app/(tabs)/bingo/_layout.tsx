import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function BingoLayout() {
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
                name="movies"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Bingo des films de Noël"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="activities"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Bingo des activités de Noël"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="telefilms"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Bingo des téléfilms de Noël"
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
