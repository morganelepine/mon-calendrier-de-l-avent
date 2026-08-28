import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGroup } from "@/services/group.service";
import { logClient } from "@/services/log.service";
import { StorageKeys } from "@/constants/storageKeys";
import { showToast } from "@/components/utils/Toast";

export function useCreateGroup(userId: number | null, userUuid: string | null) {
    return async function createMyGroup(): Promise<boolean> {
        if (!userId) return false;

        try {
            await createGroup(userId);
            await AsyncStorage.setItem(StorageKeys.groupCreated, "true");
            return true;
        } catch (error) {
            await logClient("Group creation failed", {
                userUuid,
                error: String(error),
            });
            showToast("Oops... Veuillez réessayer !", "long");
            return false;
        }
    };
}
