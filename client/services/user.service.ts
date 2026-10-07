import { User } from "@/types/types";
import { apiFetch } from "@/services/apiFetch";

// Idempotent: returns the existing account for this uuid if there is one,
// otherwise creates it.
export const getOrCreateUser = async (userUuid: string): Promise<User> => {
    return apiFetch<User>("/users", {
        method: "POST",
        body: { uuid: userUuid, score: 0 },
    });
};

export const getUser = async (userUuid: string): Promise<User> => {
    return apiFetch<User>(`/users/${userUuid}`);
};

export async function searchUsers(
    query: string,
    scope: { groupId: string } | { userId: number },
): Promise<User[]> {
    const filter =
        "groupId" in scope
            ? `groupId=${scope.groupId}`
            : `userId=${scope.userId}`;
    return apiFetch<User[]>(`/users/search?query=${query}&${filter}`);
}
