import { useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Group } from "@/types/types";
import { useUser } from "@/contexts/UserContext";
import { getGroup } from "@/services/group.service";
import { logClient } from "@/services/log.service";
import { MyGroup } from "@/components/group/MyGroup";
import { ErrorLoading } from "@/components/utils/ErrorLoading";
import { BackgroundImage } from "@/components/utils/BackgroundImage";

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
                "Impossible de charger votre groupe. Vérifiez votre connexion Internet."
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
        }, [userId])
    );

    if (loading || error || !myGroup || !userId) {
        return (
            <BackgroundImage image="blue_background_darker_d10kn5">
                <View style={{ flex: 1 }}>
                    <ErrorLoading
                        loading={true}
                        error={null}
                        refreshScores={() => {
                            if (userId) fetchMyGroup(userId);
                        }}
                    />
                </View>
            </BackgroundImage>
        );
    }

    return (
        <MyGroup
            myGroup={myGroup}
            userId={userId}
            username={username}
            fetchMyGroup={fetchMyGroup}
        />
    );
}
