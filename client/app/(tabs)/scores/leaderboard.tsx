import { useEffect, useState, useRef } from "react";
import { View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Colors } from "@/constants/Colors";
import { API_URL } from "@/constants/api";
import { useUser } from "@/contexts/UserContext";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

const ITEM_HEIGHT = 44;

export default function LeaderboardScreen() {
    const [leaderboard, setLeaderboard] = useState<
        { username: string; score: number }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const flatListRef = useRef<FlatList>(null);

    const backgroundImage = getCloudinaryImageUrl(
        "blue_background_darker_d10kn5"
    );
    const { username } = useUser();

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/scores/leaderboard`);
            const result = await response.json();

            if (Array.isArray(result)) {
                // Old format
                setLeaderboard(result);
            } else if (result.data) {
                setLeaderboard(result.data);
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setError(
                "Impossible de charger le classement... Vérifiez votre connexion Internet."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // Scroll to user
    // useEffect(() => {
    //     if (!loading && leaderboard.length > 0) {
    //         const userIndex = leaderboard.findIndex(
    //             (item) => item.username === username
    //         );
    //         if (userIndex !== -1 && userIndex > 10) {
    //             setTimeout(() => {
    //                 flatListRef.current?.scrollToIndex({
    //                     index: userIndex,
    //                     animated: true,
    //                 });
    //             }, 400);
    //         }
    //     }
    // }, [loading, leaderboard]);

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <LeaderBoardItem index={index} item={item} username={username} />
    );

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <View style={{ flex: 1 }}>
                <ErrorLoading
                    error={error}
                    loading={loading}
                    refreshScores={fetchLeaderboard}
                />

                {!error && !loading && (
                    <FlatList
                        ref={flatListRef}
                        data={leaderboard}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        initialNumToRender={20}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        removeClippedSubviews
                        getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index,
                        })}
                    />
                )}
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
});
