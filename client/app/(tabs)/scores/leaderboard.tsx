import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContext";
import { getCloudinaryImageUrl } from "@/services/cloudinary";
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { API_URL } from "@/constants/api";

export default function LeaderboardScreen() {
    const [leaderboard, setLeaderboard] = useState<
        { username: string; score: number }[]
    >([]);
    const backgroundImage = getCloudinaryImageUrl(
        "blue_background_darker_d10kn5"
    );
    const { username } = useUser();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${API_URL}/scores/leaderboard`);
                const data = await response.json();
                setLeaderboard(data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <View style={styles.container}>
                <FlatList
                    data={leaderboard}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.rowContainer}>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        backgroundColor:
                                            item.username === username
                                                ? Colors.green
                                                : Colors.snow,
                                    },
                                ]}
                            >
                                <ThemedText
                                    style={[
                                        styles.rank,
                                        {
                                            color:
                                                item.username === username
                                                    ? Colors.snow
                                                    : Colors.blue,
                                        },
                                    ]}
                                >
                                    {index + 1}
                                </ThemedText>
                                <ThemedText
                                    style={{
                                        flex: 1,
                                        color:
                                            item.username === username
                                                ? Colors.snow
                                                : Colors.blue,
                                        fontFamily:
                                            item.username === username
                                                ? "PoppinsBold"
                                                : "Poppins",
                                    }}
                                >
                                    {item.username}
                                </ThemedText>
                                <ThemedText
                                    style={[
                                        styles.score,
                                        {
                                            color:
                                                item.username === username
                                                    ? Colors.snow
                                                    : Colors.blue,
                                        },
                                    ]}
                                >
                                    {item.score}
                                </ThemedText>
                            </View>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    rowContainer: { marginHorizontal: 20 },
    container: { flex: 1, paddingTop: 20 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        paddingTop: 10,
        paddingBottom: 6,
        paddingHorizontal: 16,
        borderRadius: 22,
        gap: 16,
        borderWidth: 1,
        borderColor: Colors.snow,
    },
    rank: {
        fontFamily: "PoppinsBold",
        color: Colors.blue,
    },
    score: { fontFamily: "PoppinsBold", color: Colors.blue },
});
