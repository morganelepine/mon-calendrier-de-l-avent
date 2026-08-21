import { useEffect, useState, useRef } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { getLeaderboard } from "@/services/score.service";
import { Colors } from "@/constants/Colors";
import { isDecember } from "@/constants/Dates";
import { useUser } from "@/contexts/UserContext";

const ITEM_HEIGHT = 60; // 44 + 16 marginBottom

export default function LeaderboardScreen() {
    const { username } = useUser();
    const flatListRef = useRef<FlatList>(null);
    const [leaderboard, setLeaderboard] = useState<
        { username: string; score: number }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAtUserScore, setIsAtUserScore] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await getLeaderboard();

            if (Array.isArray(result)) {
                // Old format
                setLeaderboard(result);
            } else if (result.data) {
                setLeaderboard(result.data);
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setError(
                "Impossible de charger le classement. Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    useEffect(() => {
        if (leaderboard.length > 0 && username) {
            const index = leaderboard.findIndex(
                (item) => item.username === username,
            );
            setShowButton(index > 9);
        }
    }, [leaderboard, username]);

    const renderItem = ({
        item,
        index,
    }: {
        item: { username: string; score: number };
        index: number;
    }) => <LeaderBoardItem index={index} item={item} username={username} />;

    // Go to user score
    const scrollToUser = async () => {
        if (!leaderboard || leaderboard.length === 0) return;

        if (isAtUserScore) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            setIsAtUserScore(false);
            return;
        }

        const index = leaderboard.findIndex(
            (item) => item.username === username,
        );

        if (index !== -1) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index,
                    animated: true,
                });
                setIsAtUserScore(true);
            }, 200);
        }
    };

    return (
        <BlueBackground>
            <View style={{ flex: 1 }}>
                <ErrorLoading
                    error={error}
                    loading={loading}
                    refreshScores={fetchLeaderboard}
                />

                {!error && !loading && !isDecember && (
                    <View style={styles.offSeasonContainer}>
                        <ThemedText style={styles.offSeasonText}>
                            Rendez-vous le 1er décembre pour découvrir le
                            classement !
                        </ThemedText>
                    </View>
                )}

                {!error && !loading && isDecember && (
                    <>
                        {showButton && (
                            <View style={styles.stickyContainer}>
                                <Pressable
                                    style={styles.button}
                                    onPress={scrollToUser}
                                >
                                    <ThemedText style={{ color: Colors.snow }}>
                                        {isAtUserScore
                                            ? "Revenir en haut"
                                            : "Voir mon score"}
                                    </ThemedText>
                                </Pressable>
                            </View>
                        )}

                        <FlatList
                            ref={flatListRef}
                            data={leaderboard}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingBottom: 80 }}
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
                    </>
                )}
            </View>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    offSeasonContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    offSeasonText: {
        color: Colors.snow,
        textAlign: "center",
    },
    stickyContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 10,
    },
    button: {
        backgroundColor: Colors.green,
        borderWidth: 1,
        borderColor: Colors.snow,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 28,
    },
});
