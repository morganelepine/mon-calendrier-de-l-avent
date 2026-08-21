import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { router } from "expo-router";
import { CustomSafeAreaView } from "@/components/utils/custom/CustomSafeAreaView";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@/contexts/UserContext";

function OptionItem({
    title,
    iconName,
    iconColor,
    onPress,
}: Readonly<{
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    onPress: () => void;
}>) {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View
                style={[styles.iconContainer, { backgroundColor: iconColor }]}
            >
                <Ionicons name={iconName} size={20} color="#fff" />
            </View>

            <Text style={styles.title}>{title}</Text>

            <Ionicons name="chevron-forward" size={20} color="#aaa" />
        </TouchableOpacity>
    );
}

export default function InformationsScreen() {
    const { username } = useUser();

    return (
        <BlueBackground>
            <CustomSafeAreaView>
                <View style={styles.pageContainer}>
                    <ThemedText style={styles.username}>
                        Bienvenue {username}
                    </ThemedText>
                    <OptionItem
                        title="Contenu de l'application"
                        iconName="gift-outline"
                        iconColor={Colors.blue}
                        onPress={() => router.push("/informations/content")}
                    />

                    <OptionItem
                        title="Règles pour gagner des points"
                        iconName="game-controller-outline"
                        iconColor={Colors.lightBlue}
                        onPress={() => router.push("/informations/rules")}
                    />

                    <OptionItem
                        title="Fonctionnement des bingos"
                        iconName="eye-outline"
                        iconColor={Colors.green}
                        onPress={() => router.push("/informations/bingo")}
                    />

                    <OptionItem
                        title="Gestion de la musique"
                        iconName="musical-notes-outline"
                        iconColor={Colors.pink}
                        onPress={() => router.push("/informations/music")}
                    />

                    <OptionItem
                        title="Noter l'application"
                        iconName="star-outline"
                        iconColor={Colors.gold}
                        onPress={() => router.push("/informations/rate")}
                    />

                    <OptionItem
                        title="Remerciements"
                        iconName="heart-outline"
                        iconColor={Colors.red}
                        onPress={() => router.push("/informations/copyrights")}
                    />

                    <OptionItem
                        title="Me contacter"
                        iconName="flower-outline"
                        iconColor={"#646681"}
                        onPress={() => router.push("/informations/contact")}
                    />
                </View>
            </CustomSafeAreaView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    username: {
        color: Colors.snow,
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        paddingLeft: 20,
        gap: 16,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.snow,
        borderTopLeftRadius: 8,
        borderStartEndRadius: 8,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});
