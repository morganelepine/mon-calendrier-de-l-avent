import { API_URL } from "@/constants/api";

export async function createGroup(ownerId: number) {
    const response = await fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId }),
    });
    const group = await response.json();
    return group;
}

export async function getGroup(userId: number) {
    const response = await fetch(`${API_URL}/groups/${userId}`);
    const group = await response.json();
    return group;
}

export async function addMember(groupId: number, userId: number) {
    const response = await fetch(`${API_URL}/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });
    return response.json();
}

export async function removeMember(groupId: number, userId: number) {
    await fetch(`${API_URL}/groups/${groupId}/members`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });
}
