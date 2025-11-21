import { CustomHeader } from "@/components/navigation/CustomHeader";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function InformationsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blue,
                },
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="storygame"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Le jeu littéraire"
                                backgroundColor={Colors.green}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
