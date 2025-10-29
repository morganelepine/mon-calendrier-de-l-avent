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
                name="content"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Contenu de l'application"
                                backgroundColor={Colors.blue}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="rules"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Règles du jeu"
                                backgroundColor={Colors.blue}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="bingo"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Bingos de Noël"
                                backgroundColor={Colors.blue}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="music"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Gestion de la musique"
                                backgroundColor={Colors.blue}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="rate"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Noter l'application"
                                backgroundColor={Colors.green}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="copyrights"
                options={{
                    header: () => {
                        return (
                            <CustomHeader
                                title="Remerciements"
                                backgroundColor={Colors.blue}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
