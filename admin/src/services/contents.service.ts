import { apiFetch } from "./apiFetch";
import { ContentDetail, ContentInput, ContentSummary, Season } from "../types";

export const listContents = async (dayNumber?: number, season?: Season) => {
    const params = new URLSearchParams();
    if (dayNumber !== undefined) params.set("dayNumber", String(dayNumber));
    if (season !== undefined) params.set("season", season);
    const query = params.toString() ? `?${params.toString()}` : "";

    const response = await apiFetch<{ contents: ContentSummary[] }>(
        "/admin/contents" + query,
    );

    return response.contents;
};

export const getContent = (id: number) =>
    apiFetch<{ content: ContentDetail }>(`/admin/contents/${id}`).then(
        (response) => response.content,
    );

export const createContent = (data: ContentInput) =>
    apiFetch<{ content: ContentDetail }>("/admin/contents", {
        method: "POST",
        body: data,
    }).then((response) => response.content);

export const updateContent = (id: number, data: ContentInput) =>
    apiFetch<{ content: ContentDetail }>(`/admin/contents/${id}`, {
        method: "PUT",
        body: data,
    }).then((response) => response.content);

export const deleteContent = (id: number) =>
    apiFetch<{ success: boolean }>(`/admin/contents/${id}`, {
        method: "DELETE",
    });
