import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { PLAY_STORE_URL } from "@/constants/Links";
import {
    isOctober,
    currentDay,
    isDecember,
    isAfterChristmas,
    daysToCalendar,
    christmasDay,
    getDaysUntil,
    isHalloween,
    daysToHalloween,
} from "@/constants/Dates";
import { ChristmasTargetDay } from "@/enums/enums";
import { CountdownDisplay } from "@/components/calendar/Countdown/CountdownDisplay";
import {
    useCountdownVariant,
    useCountdownShowSeconds,
    useChristmasTargetDay,
} from "@/contexts/CountdownVariantContext";

const useHomeState = () => {
    const [targetDay] = useChristmasTargetDay(); // 24 or 25

    const countdownTargetDate = new Date(
        christmasDay.getFullYear(),
        11,
        targetDay,
    );
    const nightsToTarget = getDaysUntil(countdownTargetDate);

    const showCountdown = isDecember && currentDay < targetDay;
    const showChristmasGreeting =
        isDecember && currentDay >= targetDay && !isAfterChristmas;
    const christmasGreeting =
        targetDay === ChristmasTargetDay.Eve && currentDay === 24
            ? "Joyeux réveillon de Noël !"
            : "Joyeux Noël !";

    return {
        countdownTargetDate,
        nightsToTarget,
        showCountdown,
        showChristmasGreeting,
        christmasGreeting,
    };
};

const plural = (n: number, singular: string, pluralForm: string) =>
    `${n} ${n > 1 ? pluralForm : singular}`;

// Caption of the shared home image, or null when there is nothing to share
// (after Christmas).
export const useHomeShareMessage = (): string | null => {
    const {
        nightsToTarget,
        showCountdown,
        showChristmasGreeting,
        christmasGreeting,
    } = useHomeState();

    const countdownSuffix = `\nFais le décompte avec Mon calendrier de l'Avent\u00a0: ${PLAY_STORE_URL}`;
    const greetingSuffix = `\nEnvoyé depuis Mon calendrier de l'Avent\u00a0: ${PLAY_STORE_URL}`;

    if (isHalloween) return `🎃 Happy Halloween ! ${greetingSuffix}`;
    if (isOctober) {
        return `🎃 Plus que ${plural(daysToHalloween, "jour", "jours")} avant Halloween\u00a0! ${countdownSuffix}`;
    }
    if (!isDecember) {
        return `🎄 Plus que ${plural(daysToCalendar, "jour", "jours")} avant le départ du calendrier de l'Avent\u00a0! ${countdownSuffix}`;
    }
    if (showCountdown) {
        return `✨ Plus que ${plural(nightsToTarget, "nuit", "nuits")} avant Noël\u00a0! ${countdownSuffix}`;
    }
    if (showChristmasGreeting) {
        return `🎄 ${christmasGreeting} ${greetingSuffix}`;
    }
    return null;
};

// Countdown or greeting of the home screen, also drawn on its share image.
export const HomeHeadline = () => {
    const [countdownVariant] = useCountdownVariant();
    const [showSeconds] = useCountdownShowSeconds();
    const {
        countdownTargetDate,
        nightsToTarget,
        showCountdown,
        showChristmasGreeting,
        christmasGreeting,
    } = useHomeState();

    return (
        <>
            {/* October: countdown to Halloween */}

            {isOctober && !isHalloween && (
                <>
                    <ThemedText style={[styles.title, styles.countdown]}>
                        {daysToHalloween}{" "}
                        {daysToHalloween > 1 ? "jours" : "jour"}
                    </ThemedText>
                    <ThemedText style={[styles.title, styles.beforeCalendar]}>
                        avant Halloween
                    </ThemedText>
                </>
            )}

            {isHalloween && (
                <ThemedText style={[styles.title, styles.christmasGreeting]}>
                    Happy{"\n"}Halloween
                </ThemedText>
            )}

            {/* Before calendar departure */}

            {!isDecember && !isOctober && (
                <>
                    <ThemedText style={[styles.title, styles.countdown]}>
                        {daysToCalendar} {daysToCalendar > 1 ? "jours" : "jour"}
                    </ThemedText>
                    <ThemedText style={[styles.title, styles.beforeCalendar]}>
                        avant le départ du calendrier
                    </ThemedText>
                </>
            )}

            {/* During calendar period */}

            {showCountdown && (
                <CountdownDisplay
                    variant={countdownVariant}
                    nights={nightsToTarget}
                    targetDate={countdownTargetDate}
                    showSeconds={showSeconds}
                />
            )}

            {/* Target day(s) reached, until the 26th */}

            {showChristmasGreeting && (
                <ThemedText style={[styles.title, styles.christmasGreeting]}>
                    {christmasGreeting}
                </ThemedText>
            )}

            {/* After calendar period, in december only */}

            {isAfterChristmas && (
                <ThemedText style={[styles.title, styles.afterChristmas]}>
                    Rendez-vous l'année prochaine&nbsp;!
                </ThemedText>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "FreightNeoBold",
        letterSpacing: 0.4,
        textAlign: "center",
        color: Colors.snow,
    },
    countdown: {
        fontSize: 55,
        letterSpacing: 6,
    },
    beforeCalendar: {
        fontSize: 20,
        fontFamily: "FreightNeo",
        marginBottom: 30,
    },
    christmasGreeting: {
        fontSize: 40,
        letterSpacing: 1,
    },
    afterChristmas: {
        fontSize: 40,
        letterSpacing: 1,
    },
});
