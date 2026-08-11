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

export async function searchUsers(
    query: string,
    groupId: string,
): Promise<User[]> {
    return apiFetch<User[]>(`/users/search?query=${query}&groupId=${groupId}`);
}
