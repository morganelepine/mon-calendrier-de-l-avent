import { apiFetch } from "@/services/apiFetch";

export type Announcement = {
    // Stable: used as the "seen" storage key.
    id: string;
    title: string;
    message: string;
    buttonLabel: string;
    url: string;
    // ISO dates, start inclusive, end exclusive.
    startDate: string;
    endDate: string;
};

export type VersionRequirement = {
    min_supported_version: string;
    latest_version: string;
    update_message: string | null;
    announcements: Announcement[];
};

// Kept so other consumers (announcements) reuse the version check's
// response instead of firing a second request.
let lastRequirementPromise: Promise<VersionRequirement> | null = null;

export const getVersionRequirement = (): Promise<VersionRequirement> => {
    const promise = apiFetch<VersionRequirement>("/version");
    lastRequirementPromise = promise.catch((error) => {
        lastRequirementPromise = null;
        throw error;
    });
    return promise;
};

export const getLastVersionRequirement = (): Promise<VersionRequirement> =>
    lastRequirementPromise ?? getVersionRequirement();
