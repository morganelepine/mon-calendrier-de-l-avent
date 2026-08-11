import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { createGroup } from "@/services/group.service";
import { logClient } from "@/services/log.service";

export function useCreateGroup(userId: number | null, userUuid: string | null) {
    return async function createMyGroup(): Promise<boolean> {
        if (!userId) return false;

        try {
            await createGroup(userId);
            await AsyncStorage.setItem("groupCreated", "true");
            return true;
        } catch (error) {
            await logClient("Group creation failed", {
                userUuid,
                error: String(error),
            });
            ToastAndroid.show(
                "Oops... Veuillez réessayer !",
                ToastAndroid.LONG,
            );
            return false;
        }
    };
}
