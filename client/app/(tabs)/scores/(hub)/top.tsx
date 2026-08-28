import { useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { OffSeason } from "@/components/score/OffSeason";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { getLeaderboard } from "@/services/score.service";
import { Colors } from "@/constants/Colors";
import { isDecember } from "@/constants/Dates";
import { useUser } from "@/contexts/UserContext";

const PAGE_SIZE = 25;

type Entry = { username: string; score: number };

export default function TopScreen() {
    const { username } = useUser();
    const [leaderboard, setLeaderboard] = useState<Entry[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPage = async (pageToLoad: number, replace: boolean) => {
        try {
            if (replace) setLoading(true);
            else setLoadingMore(true);
            setError(null);

            const result = await getLeaderboard(pageToLoad, PAGE_SIZE);
            setLeaderboard((prev) =>
                replace ? result.data : [...prev, ...result.data],
            );
            setHasMore(result.hasMore);
            setPage(pageToLoad);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setError(
                "Impossible de charger le classement. Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPage(1, true);
        }, []),
    );

    return (
        <BlueBackground>
            <ErrorLoading
                error={error}
                loading={loading}
                refreshScores={() => fetchPage(1, true)}
            />

            {!error && !loading && !isDecember && <OffSeason />}

            {!error &&
                !loading &&
                isDecember &&
                (leaderboard.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <ThemedText style={styles.centerText}>
                            Lorsque les joueur·euse·s commenceront à ouvrir le
                            calendrier, les 25 meilleurs scores apparaîtront
                            ici.
                        </ThemedText>
                    </View>
                ) : (
                    <FlatList
                        data={leaderboard}
                        keyExtractor={(item, index) =>
                            `${item.username}-${index}`
                        }
                        renderItem={({ item, index }) => (
                            <LeaderBoardItem
                                index={index}
                                item={item}
                                username={username}
                            />
                        )}
                        onRefresh={() => fetchPage(1, true)}
                        refreshing={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        ListHeaderComponent={
                            <ThemedText style={styles.title}>
                                Classement des{"\n"}
                                {PAGE_SIZE} meilleur·e·s joueur·euse·s
                            </ThemedText>
                        }
                        ListFooterComponent={
                            hasMore ? (
                                <LeaderBoardButton
                                    onPress={() => fetchPage(page + 1, false)}
                                    text="Voir plus"
                                    loadingMore={loadingMore}
                                />
                            ) : null
                        }
                    />
                ))}
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    title: {
        color: Colors.snow,
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    centerText: {
        color: Colors.snow,
        textAlign: "center",
    },
});
