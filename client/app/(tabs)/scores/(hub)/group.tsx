import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Group } from "@/types/types";
import { useUser } from "@/contexts/UserContext";
import { getGroup } from "@/services/group.service";
import { logClient } from "@/services/log.service";
import { MyGroup } from "@/components/group/MyGroup";
import { NoGroup } from "@/components/group/NoGroup";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { BlueBackground } from "@/components/utils/BlueBackground";

export default function GroupScreen() {
    const { username, userId, userUuid } = useUser();
    const [myGroup, setMyGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMyGroup = async (userId: number) => {
        try {
            setLoading(true);
            setError(null);
            const group = await getGroup(userId);
            setMyGroup(group);
        } catch (error) {
            setError(
                "Impossible de charger votre groupe. Vérifiez votre connexion Internet.",
            );
            await logClient("Group fetch failed", {
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
        }, [userId]),
    );

    return (
        <BlueBackground>
            {(loading || !userId) && (
                // Still loading, or userId hasn't resolved yet
                // (should be near-instant now, but stay defensive).
                <ErrorLoading
                    loading={true}
                    error={null}
                    refreshScores={() => {
                        if (userId) fetchMyGroup(userId);
                    }}
                />
            )}

            {!loading && userId && error && (
                // The fetch actually failed — show the error + retry, not a spinner.
                <ErrorLoading
                    loading={false}
                    error={error}
                    refreshScores={() => fetchMyGroup(userId)}
                />
            )}

            {!loading && userId && !error && !myGroup && (
                // Fetch succeeded, there's just no group yet — offer to
                // create one instead of spinning forever.
                <NoGroup
                    userId={userId}
                    userUuid={userUuid}
                    onCreated={() => fetchMyGroup(userId)}
                />
            )}

            {!loading && userId && !error && myGroup && (
                <MyGroup
                    myGroup={myGroup}
                    userId={userId}
                    username={username}
                    fetchMyGroup={fetchMyGroup}
                />
            )}
        </BlueBackground>
    );
}
