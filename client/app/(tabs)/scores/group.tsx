import { useCallback, useState } from "react";
import { Group } from "@/types/types";
import { useUser } from "@/contexts/UserContext";
import { getGroup } from "@/services/group.service";
import { MyGroup } from "@/components/group/MyGroup";
import { useFocusEffect } from "expo-router";

export default function GroupScreen() {
    const { username, userId } = useUser();
    const [myGroup, setMyGroup] = useState<Group | null>(null);

    const fetchMyGroup = async (userId: number) => {
        const group = await getGroup(userId);
        setMyGroup(group);
    };

    useFocusEffect(
        useCallback(() => {
            fetchMyGroup(userId);
        }, [])
    );

    if (!myGroup) {
        return null;
    }

    return <MyGroup myGroup={myGroup} username={username} />;
}
