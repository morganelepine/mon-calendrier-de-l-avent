import { ScreenHeader } from "@/components/navigation/ScreenHeader";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { BingoHeader } from "@/components/bingo/BingoHeader";
import {
    ActivitiesBingoRules,
    MoviesBingoRules,
    TelefilmsBingoRules,
} from "@/components/bingo/BingoRules";

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
            <Stack.Screen name="halloween" options={{ headerShown: false }} />
            <Stack.Screen
                name="movies"
                options={{
                    header: () => (
                        <BingoHeader
                            title="Bingo des films de Noël"
                            rules={<MoviesBingoRules />}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="activities"
                options={{
                    header: () => (
                        <BingoHeader
                            title="Bingo des activités de Noël"
                            rules={<ActivitiesBingoRules />}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="telefilms"
                options={{
                    header: () => (
                        <BingoHeader
                            title="Bingo des téléfilms de Noël"
                            rules={<TelefilmsBingoRules />}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="tv-movies"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Les téléfilms de Noël du jour"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name="game2048"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="game2048-leaderboard"
                options={{
                    header: () => {
                        return (
                            <ScreenHeader
                                title="Classement au 2048"
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
