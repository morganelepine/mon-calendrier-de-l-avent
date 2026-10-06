import { apiFetch } from "./apiFetch";
import { Season, Stats } from "../types";

export const getStats = (year: number, season: Season) =>
    apiFetch<Stats>(`/admin/stats?year=${year}&season=${season}`);
