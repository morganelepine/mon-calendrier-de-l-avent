import { API_URL } from "@/constants/api";

export async function getAllUsers() {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
}

export async function addMemberToGroup(groupId: number, userId: number) {
    const res = await fetch(`${API_URL}/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });
    return res.json();
}
