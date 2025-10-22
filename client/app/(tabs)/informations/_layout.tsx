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
                    title: "Contenu de l'application",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.snow,
                    },
                }}
            />
            <Stack.Screen
                name="rules"
                options={{
                    title: "Gagner des points",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.snow,
                    },
                }}
            />
            <Stack.Screen
                name="bingo"
                options={{
                    title: "Bingo des téléfilms",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.snow,
                    },
                }}
            />
            <Stack.Screen
                name="music"
                options={{
                    title: "Gestion de la musique",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.snow,
                    },
                }}
            />
            <Stack.Screen
                name="rate"
                options={{
                    title: "Noter l'application",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.snow,
                    },
                }}
            />
            <Stack.Screen
                name="copyrights"
                options={{
                    title: "Remerciements",
                    headerTitleStyle: {
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: Colors.snow,
                    },
                }}
            />
        </Stack>
    );
}
