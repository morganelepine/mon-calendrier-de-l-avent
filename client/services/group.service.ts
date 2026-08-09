import { Group } from "@/types/types";
import { apiFetch } from "@/services/apiFetch";

export async function createGroup(ownerId: number): Promise<Group> {
    return apiFetch<Group>("/groups", {
        method: "POST",
        body: { ownerId },
    });
}

export async function getGroup(userId: number): Promise<Group> {
    return apiFetch<Group>(`/groups/${userId}`);
}

export async function addMember(
    groupId: number,
    userId: number,
): Promise<void> {
    return apiFetch(`/groups/${groupId}/members`, {
        method: "POST",
        body: { userId },
    });
}

export async function removeMember(
    groupId: number,
    userId: number,
): Promise<void> {
    await apiFetch(`/groups/${groupId}/members`, {
        method: "DELETE",
        body: { userId },
    });
}
