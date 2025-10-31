import { useEffect, useState, useRef } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { Colors } from "@/constants/Colors";
import { API_URL } from "@/constants/api";
import { useUser } from "@/contexts/UserContext";
import { getCloudinaryImageUrl } from "@/services/cloudinary";

const ITEMS_PER_PAGE = 30; // nombre d’items chargés par requête
const ITEM_HEIGHT = 44;

export default function LeaderboardScreen() {
    const [leaderboard, setLeaderboard] = useState<
        { username: string; score: number }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const backgroundImage = getCloudinaryImageUrl(
        "blue_background_darker_d10kn5"
    );
    const { username } = useUser();

    const fetchLeaderboard = async (pageToFetch = 1) => {
        try {
            if (pageToFetch === 1) setLoading(true);
            else setLoadingMore(true);

            const response = await fetch(
                `${API_URL}/scores/leaderboard?page=${pageToFetch}&limit=${ITEMS_PER_PAGE}`
            );
            const result = await response.json();

            if (pageToFetch === 1) setLeaderboard(result.data);
            else setLeaderboard((prev) => [...prev, ...result.data]);

            setHasMore(result.hasMore);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setError(
                "Impossible de charger le classement... Vérifiez votre connexion Internet."
            );
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // Scroll automatique vers l’utilisateur connecté
    useEffect(() => {
        if (!loading && leaderboard.length > 0) {
            const userIndex = leaderboard.findIndex(
                (item) => item.username === username
            );
            if (userIndex !== -1 && userIndex >= 10) {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                        index: userIndex,
                        animated: true,
                    });
                }, 500);
            }
        }
    }, [loading, leaderboard]);

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <LeaderBoardItem index={index} item={item} username={username} />
    );

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchLeaderboard(nextPage);
        }
    };

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
                    refreshScores={() => fetchLeaderboard(1)}
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
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        getItemLayout={(_, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index,
                        })}
                        ListFooterComponent={
                            loadingMore ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.snow}
                                    style={{ marginVertical: 20 }}
                                />
                            ) : null
                        }
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
