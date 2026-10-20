import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Announcement,
    getActiveAnnouncements,
} from "@/constants/Announcements";
import { announcementSeenKey } from "@/constants/storageKeys";

// Returns the first active announcement not yet seen on this device,
// and a callback to mark it as seen.
export const useAnnouncement = (): {
    announcement: Announcement | null;
    dismiss: () => void;
} => {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);

    useEffect(() => {
        const loadAnnouncement = async (): Promise<void> => {
            for (const candidate of getActiveAnnouncements()) {
                const seen = await AsyncStorage.getItem(
                    announcementSeenKey(candidate.id),
                );
                if (!seen) {
                    setAnnouncement(candidate);
                    return;
                }
            }
        };
        loadAnnouncement();
    }, []);

    const dismiss = (): void => {
        if (!announcement) return;
        AsyncStorage.setItem(announcementSeenKey(announcement.id), "true");
        setAnnouncement(null);
    };

    return { announcement, dismiss };
};
