import { API_URL } from "@/constants/api";

export const saveUser = async (userUuid: string, score: number) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uuid: userUuid, score }),
        });

        if (!response.ok) throw new Error("Failed to save user");

        const data = await response.json();
        console.log("User saved:", data.username);
        return data.username;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
};

export const getUser = async (userUuid: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${userUuid}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 404) return null;

        if (!response.ok)
            throw new Error(`Erreur serveur (${response.status})`);

        const user = await response.json();
        return user;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in getUser :", error.message);
        }
        return null;
    }
};
