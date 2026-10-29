import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/services/apiFetch";
import { StorageKeys } from "@/constants/storageKeys";
import {
    Retrospective,
    RetrospectiveResponse,
} from "@/interfaces/retrospectiveInterface";

// The recap is frozen once computed (Dec 25th), so one fetch per session is enough.
// Cleared on failure so the next call retries.
let retrospectivePromise: Promise<Retrospective | null> | null = null;

export const getRetrospective = (): Promise<Retrospective | null> => {
    retrospectivePromise ??= (async (): Promise<Retrospective | null> => {
        const userUuid = await AsyncStorage.getItem(StorageKeys.userUuid);
        if (!userUuid) return null;
        const response = await apiFetch<RetrospectiveResponse>(
            `/retrospective/${userUuid}`,
        );
        return response.available ? response : null;
    })().catch((error) => {
        retrospectivePromise = null;
        throw error;
    });
    return retrospectivePromise;
};
