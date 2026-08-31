import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { NoGroup } from "@/components/group/NoGroup";
import { Game2048LeaderboardList } from "@/components/games2048/Game2048LeaderboardList";
import { useUser } from "@/contexts/UserContext";
import { getGroup } from "@/services/group.service";
import { logClient } from "@/services/log.service";
import { Group } from "@/types/types";

export default function Game2048LeaderboardGroupScreen() {
    const { userId, userUuid } = useUser();
    const [myGroup, setMyGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMyGroup = async (userId: number): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const group = await getGroup(userId);
            setMyGroup(group);
        } catch (error) {
            setError(
                "Impossible de charger votre groupe. Vérifiez votre connexion Internet.",
            );
            await logClient("Group fetch failed (2048 leaderboard)", {
                userUuid,
                error: String(error),
            });
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (userId) fetchMyGroup(userId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [userId]),
    );

    return (
        <BlueBackground>
            {(loading || !userId) && (
                <ErrorLoading
                    loading={true}
                    error={null}
                    refreshScores={() => {
                        if (userId) fetchMyGroup(userId);
                    }}
                />
            )}

            {!loading && userId && error && (
                <ErrorLoading
                    loading={false}
                    error={error}
                    refreshScores={() => fetchMyGroup(userId)}
                />
            )}

            {!loading && userId && !error && !myGroup && (
                <NoGroup
                    userId={userId}
                    userUuid={userUuid}
                    onCreated={() => fetchMyGroup(userId)}
                />
            )}

            {!loading && userId && !error && myGroup && (
                <Game2048LeaderboardList groupId={myGroup.id} />
            )}
        </BlueBackground>
    );
}
