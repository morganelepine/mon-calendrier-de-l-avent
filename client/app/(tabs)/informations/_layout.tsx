import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { Colors, Theme } from "@/constants/Colors";
import { isOctober } from "@/constants/Dates";
import { Stack } from "expo-router";

export default function InformationsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Theme.tint,
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
                                backgroundColor={Theme.surface}
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
                                backgroundColor={Theme.surface}
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
                                title={
                                    isOctober
                                        ? "Le bingo automnal"
                                        : "Les bingos de Noël"
                                }
                                backgroundColor={Theme.surface}
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
                                title="Soutenir l'application"
                                backgroundColor={Theme.surface}
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
                                backgroundColor={Theme.surface}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Paramètres"
                                backgroundColor={Theme.surface}
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
                                backgroundColor={Theme.surface}
                                color={Colors.snow}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
