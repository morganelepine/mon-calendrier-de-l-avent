import { apiFetch } from "@/services/apiFetch";

export const getMinRequiredVersion = async (): Promise<string> => {
    const data = await apiFetch<{ min_required_version: string }>("/version");
    return data.min_required_version;
};
