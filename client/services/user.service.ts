import { User } from "@/types/types";
import { apiFetch, ApiError } from "@/services/apiFetch";

export const saveUser = async (
    userUuid: string,
    score: number,
): Promise<string> => {
    const user = await apiFetch<User>("/users", {
        method: "POST",
        body: { uuid: userUuid, score },
    });

    return user.username;
};

export const getUser = async (userUuid: string): Promise<User | null> => {
    try {
        return await apiFetch<User>(`/users/${userUuid}`);
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
    }
};

export async function searchUsers(
    query: string,
    groupId: string,
): Promise<User[]> {
    return apiFetch<User[]>(`/users/search?query=${query}&groupId=${groupId}`);
}
