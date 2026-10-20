import { getNow } from "@/constants/Dates";
import { SATISFACTION_SURVEY_URL } from "@/constants/Links";

// One-shot pop-ins shown on the home screen during a date window.
export interface Announcement {
    // Unique and stable: used as the "seen" storage key.
    id: string;
    // Inclusive.
    startDate: Date;
    // Exclusive.
    endDate: Date;
    title: string;
    message: string;
    buttonLabel: string;
    url: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
    {
        id: "satisfaction_survey_october_2026",
        startDate: new Date(2026, 9, 28),
        endDate: new Date(2026, 10, 1),
        title: "Votre avis est précieux",
        message:
            "Qu'avez-vous pensé de ce nouveau calendrier d'automne ? 🎃\nPour m'aider à l'améliorer, n'hésitez pas à répondre à un mini questionnaire de satisfaction !",
        buttonLabel: "Répondre au questionnaire",
        url: SATISFACTION_SURVEY_URL,
    },
];

export const getActiveAnnouncements = (): Announcement[] => {
    const now = getNow();
    return ANNOUNCEMENTS.filter(
        (announcement) =>
            announcement.startDate.getTime() <= now &&
            now < announcement.endDate.getTime(),
    );
};
