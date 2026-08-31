import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import { getGames2048Leaderboard } from "@/services/games2048.service";
import { Games2048LeaderboardEntry } from "@/interfaces/games2048Interface";
import { Colors } from "@/constants/Colors";

const PAGE_SIZE = 20;

interface Props {
    groupId?: number;
}

export const Game2048LeaderboardList: React.FC<Props> = ({ groupId }) => {
    const { username } = useUser();
    const [leaderboard, setLeaderboard] = useState<Games2048LeaderboardEntry[]>(
        [],
    );
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPage = useCallback(
        async (pageToLoad: number, replace: boolean): Promise<void> => {
            try {
                if (replace) setLoading(true);
                else setLoadingMore(true);
                setError(null);

                const result = await getGames2048Leaderboard(
                    pageToLoad,
                    PAGE_SIZE,
                    groupId,
                );
                setLeaderboard((prev) =>
                    replace ? result.data : [...prev, ...result.data],
                );
                setHasMore(result.hasMore);
                setPage(pageToLoad);
            } catch {
                setError(
                    "Impossible de charger le classement. Vérifiez votre connexion Internet.",
                );
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [groupId],
    );

    useEffect(() => {
        fetchPage(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId]);

    const emptyMessage = groupId
        ? "Personne dans votre groupe n'a encore de score enregistré."
        : "Personne n'a encore de score enregistré.";

    return (
        <>
            <ErrorLoading
                error={error}
                loading={loading}
                refreshScores={() => fetchPage(1, true)}
            />

            {!error &&
                !loading &&
                (leaderboard.length === 0 ? (
                    <ThemedText type="sectionText" style={styles.emptyText}>
                        {emptyMessage}
                    </ThemedText>
                ) : (
                    <FlatList
                        data={leaderboard}
                        keyExtractor={(item, index) =>
                            `${item.userId}-${index}`
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
                        contentContainerStyle={styles.listContent}
                        ListHeaderComponent={
                            !groupId ? (
                                <ThemedText style={styles.title}>
                                    Classement des {PAGE_SIZE} meilleurs
                                    scores
                                </ThemedText>
                            ) : null
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
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        color: Colors.snow,
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        paddingHorizontal: 20,
    },
    listContent: {
        paddingBottom: 40,
    },
});
