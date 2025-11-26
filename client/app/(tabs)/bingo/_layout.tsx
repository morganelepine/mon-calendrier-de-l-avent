import { CustomBingoHeader } from "@/components/navigation/CustomBingoHeader";
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
                    header: () => {
                        return (
                            <CustomBingoHeader
                                title="Bingo des activités de Noël"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                                clickedCellsKey={
                                    "bingo_activities_clicked_cells"
                                }
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
                            <CustomBingoHeader
                                title="Bingo des téléfilms de Noël"
                                backgroundColor={Colors.snow}
                                color={Colors.blue}
                                clickedCellsKey={"bingo_films_clicked_cells"}
                            />
                        );
                    },
                }}
            />
        </Stack>
    );
}
