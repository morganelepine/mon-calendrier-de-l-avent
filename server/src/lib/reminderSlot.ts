const REMINDER_SLOTS = ["morning", "evening"] as const;
export type ReminderSlot = (typeof REMINDER_SLOTS)[number];

export function isReminderSlot(value: unknown): value is ReminderSlot {
    return REMINDER_SLOTS.includes(value as ReminderSlot);
}
