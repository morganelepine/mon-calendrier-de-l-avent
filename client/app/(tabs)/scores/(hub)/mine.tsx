import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { OffSeason } from "@/components/score/OffSeason";
import { LeaderBoardItem } from "@/components/score/LeaderBoardItem";
import { LeaderBoardButton } from "@/components/score/LeaderBoardButton";
import { EmptyState } from "@/components/score/EmptyState";
import { LeaderboardHeaderText } from "@/components/score/LeaderboardHeaderText";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { BlueBackground } from "@/components/utils/BlueBackground";
import {
    getLeaderboardAround,
    type LeaderboardAroundResponse,
} from "@/services/score.service";
import { isDecember } from "@/constants/Dates";
import { useUser } from "@/contexts/UserContext";

const INITIAL_WINDOW = 5;
const WINDOW_STEP = 10;

export default function MineScreen() {
    const { username } = useUser();
    const [before, setBefore] = useState(INITIAL_WINDOW);
    const [after, setAfter] = useState(INITIAL_WINDOW);
    const [result, setResult] = useState<LeaderboardAroundResponse | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWindow = async (nextBefore: number, nextAfter: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getLeaderboardAround(nextBefore, nextAfter);
            setResult(data);
            setBefore(nextBefore);
            setAfter(nextAfter);
        } catch (error) {
            console.error("Error fetching leaderboard window:", error);
            setError(
                "Impossible de charger votre classement. Vérifiez votre connexion Internet.",
            );
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchWindow(INITIAL_WINDOW, INITIAL_WINDOW);
        }, []),
    );

    return (
        <BlueBackground>
            <ErrorLoading
                error={error}
                loading={loading}
                refreshScores={() => fetchWindow(before, after)}
            />

            {!error && !loading && !isDecember && <OffSeason />}

            {!error &&
                !loading &&
                isDecember &&
                result &&
                !result.userHasScore && (
                    <EmptyState>
                        Vous n'avez pas encore de points. Ouvrez la case du
                        jour pour en gagner et apparaître dans le classement !
                    </EmptyState>
                )}

            {!error && !loading && isDecember && result?.userHasScore && (
                <FlatList
                    data={result.data}
                    keyExtractor={(item) => item.rank.toString()}
                    onRefresh={() => fetchWindow(before, after)}
                    refreshing={false}
                    ListHeaderComponent={
                        <>
                            <LeaderboardHeaderText>
                                Vous êtes {result.userRank}e sur {result.total}
                            </LeaderboardHeaderText>
                            {result.hasMoreAbove && (
                                <LeaderBoardButton
                                    onPress={() =>
                                        fetchWindow(before + WINDOW_STEP, after)
                                    }
                                    text="Voir les personnes classées avant"
                                />
                            )}
                        </>
                    }
                    renderItem={({ item, index }) => (
                        <LeaderBoardItem
                            index={index}
                            rank={item.rank}
                            item={item}
                            username={username}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    ListFooterComponent={
                        result.hasMoreBelow ? (
                            <LeaderBoardButton
                                onPress={() =>
                                    fetchWindow(before, after + WINDOW_STEP)
                                }
                                text="Voir les personnes classées après"
                            />
                        ) : null
                    }
                />
            )}
        </BlueBackground>
    );
}
