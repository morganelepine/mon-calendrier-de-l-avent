import { ScreenHeader } from "@/components/navigation/ScreenHeader";
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
                            <ScreenHeader
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
                            <ScreenHeader
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
                            <ScreenHeader
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
                            <ScreenHeader
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
                            <ScreenHeader
                                title="Noter l'application"
                                backgroundColor={Colors.blue}
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
                            <ScreenHeader
                                title="Remerciements"
                                backgroundColor={Colors.blue}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="contact"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Me contacter"
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
