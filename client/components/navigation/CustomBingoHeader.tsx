import { StyleSheet, Pressable, View, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface CustomBingoHeaderProps {
    title: string;
    backgroundColor: string;
    color: string;
    clickedCellsKey: string;
}

export const CustomBingoHeader: React.FC<CustomBingoHeaderProps> = ({
    title,
    backgroundColor,
    color,
    clickedCellsKey,
}) => {
    const router = useRouter();

    const clearBingo = async () => {
        await AsyncStorage.setItem(clickedCellsKey, JSON.stringify([]));
        ToastAndroid.show("Grille réinitialisée !", ToastAndroid.SHORT);
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: backgroundColor,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 4,
            }}
        >
            <View
                style={{
                    backgroundColor: backgroundColor,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={color} />
                </Pressable>

                <ThemedText
                    style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 18,
                        color: color,
                        marginLeft: 12,
                        paddingTop: 2,
                    }}
                >
                    {title}
                </ThemedText>
            </View>

            {/* <Pressable onPress={clearBingo} style={styles.button}>
                <View style={styles.buttonBackground} />
                <Ionicons
                    name={"sync-outline"}
                    size={24}
                    color={Colors.snow}
                ></Ionicons>
            </Pressable> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.blue,
        borderRadius: 50,
    },
    button: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
