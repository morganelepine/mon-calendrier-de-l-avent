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
                name="activities"
                options={{
                    title: "Bingo des activités",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.blue,
                    },
                }}
            />
            <Stack.Screen
                name="telefilms"
                options={{
                    title: "Bingo des téléfilms",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.blue,
                    },
                }}
            />
        </Stack>
    );
}
