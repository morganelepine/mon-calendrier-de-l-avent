import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Announcement,
    getLastVersionRequirement,
} from "@/services/appconfig.service";
import { announcementSeenKey } from "@/constants/storageKeys";
import { getNow } from "@/constants/Dates";

const isActive = (announcement: Announcement, now: number): boolean =>
    new Date(announcement.startDate).getTime() <= now &&
    now < new Date(announcement.endDate).getTime();

// Returns the first active announcement not yet seen on this device,
// and a callback to mark it as seen.
export const useAnnouncement = (): {
    announcement: Announcement | null;
    dismiss: () => void;
} => {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);

    useEffect(() => {
        const loadAnnouncement = async (): Promise<void> => {
            const { announcements } = await getLastVersionRequirement();
            const now = getNow();
            for (const candidate of announcements ?? []) {
                if (!isActive(candidate, now)) continue;
                const seen = await AsyncStorage.getItem(
                    announcementSeenKey(candidate.id),
                );
                if (!seen) {
                    setAnnouncement(candidate);
                    return;
                }
            }
        };
        loadAnnouncement().catch((e) =>
            console.log("Erreur chargement annonce:", e),
        );
    }, []);

    const dismiss = (): void => {
        if (!announcement) return;
        AsyncStorage.setItem(announcementSeenKey(announcement.id), "true");
        setAnnouncement(null);
    };

    return { announcement, dismiss };
};
