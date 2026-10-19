import { apiFetch } from "@/services/apiFetch";

export type VersionRequirement = {
    min_supported_version: string;
    latest_version: string;
    update_message: string | null;
};

export const getVersionRequirement = (): Promise<VersionRequirement> =>
    apiFetch<VersionRequirement>("/version");
