export interface TvMovie {
    title: string;
    description: string;
    image: string | null; // null when the source has no usable image URL
    channel: string;
    startHour: string; // "hh:mm", Paris time
    endHour: string;
}
