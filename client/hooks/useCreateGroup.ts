import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGroup } from "@/services/group.service";
import { logClient } from "@/services/log.service";
import { StorageKeys } from "@/constants/storageKeys";
import { showToast } from "@/components/utils/Toast";
import { Group } from "@/types/types";

export function useCreateGroup(userId: number | null, userUuid: string | null) {
    return async function createMyGroup(
        memberIds: number[],
    ): Promise<Group | null> {
        if (!userId) return null;

        try {
            const group = await createGroup(userId, memberIds);
            await AsyncStorage.setItem(StorageKeys.groupCreated, "true");
            return group;
        } catch (error) {
            await logClient("Group creation failed", {
                userUuid,
                error: String(error),
            });
            showToast("Oops... Veuillez réessayer !", "long");
            return null;
        }
    };
}
