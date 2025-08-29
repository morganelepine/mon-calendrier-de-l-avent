const BASE_URL = "http://192.168.1.18:3000";

export const saveUser = async (userUuid: string, score: number) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uuid: userUuid, score }),
        });

        if (!response.ok) throw new Error("Failed to save user");

        const data = await response.json();
        console.log("User saved:", data.username);
        return data.username;
    } catch (error) {
        console.error("Error saving user:", error);
        if (error instanceof Error) console.error(error.message);
    }
};
