import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { DayButton } from "@/components/days/Button/DayButton";
import { DayCellRect, showDayReveal } from "@/components/days/DayReveal";
import { showToast, showPointsToast } from "@/components/utils/Toast";
import { Colors } from "@/constants/Colors";
import { currentDay, isDecember, isOctober } from "@/constants/Dates";
import { getDayCatImageUrl } from "@/data/day_cats";
import { CHALLENGE_CLOSED_DAY_TAPS } from "@/data/challenges_data";
import { getCurrentMinutes } from "@/hooks/useCurrentMinutes";
import { completeChallenge } from "@/services/challenge.service";
import { queueScore } from "@/services/score.service";
import { Day } from "@/interfaces/dayInterface";
import { ChallengeId, ScoreType } from "@/enums/enums";
import { isBetween } from "@/utils/hours";

interface DaysProps {
    days: Day[];
    setDays: (days: Day[]) => void;
    goToDay: (day: Day) => void;
}

export const Days: React.FC<DaysProps> = ({ days, setDays, goToDay }) => {
    const containerRef = useRef<View>(null);
    const closedDayTaps = useRef({ dayNumber: 0, count: 0 });

    useEffect(() => {
        if (!isDecember && !isOctober) return;
        const imageUrls = days
            .filter((day) => day.dayNumber <= currentDay)
            .map(getDayCatImageUrl)
            .filter((url) => url !== null);
        Image.prefetch(imageUrls, "memory-disk");
    }, [days]);

    const registerDayOpening = (dayNumber: number, wasAlreadyOpen: boolean) => {
        if (dayNumber !== currentDay) return;

        if (isDecember) {
            void queueScore(dayNumber, 40, String(ScoreType.DayOpening));
            if (!wasAlreadyOpen) showPointsToast(40);
            if (
                !wasAlreadyOpen &&
                isBetween(getCurrentMinutes(), "00:00", "00:31")
            ) {
                void completeChallenge(ChallengeId.MidnightDayOpening);
            }
        } else if (isOctober) {
            void queueScore(dayNumber, 10, String(ScoreType.OctoberOpening));
            // showPointsToast(10);
        }
    };

    const openDay = (day: Day, cell: DayCellRect) => {
        const imageUrl = getDayCatImageUrl(day);
        if (!imageUrl || !containerRef.current) {
            goToDay(day);
            return;
        }

        containerRef.current.measure((_x, _y, width, height, _pageX, pageY) => {
            showDayReveal({
                day,
                imageUrl,
                cell,
                // The grid starts below the status bar, the day screen doesn't.
                page: { width, height: pageY + height },
                onCovered: () => goToDay(day),
            });
        });
    };

    const registerClosedDayTap = (dayNumber: number): void => {
        const { current: taps } = closedDayTaps;
        taps.count = taps.dayNumber === dayNumber ? taps.count + 1 : 1;
        taps.dayNumber = dayNumber;
        if (taps.count >= CHALLENGE_CLOSED_DAY_TAPS) {
            void completeChallenge(ChallengeId.ClosedDayTaps);
        }
    };

    const handleDayOpening = (dayNumber: number, cell: DayCellRect) => {
        const clickedDay = days.find((day) => day.dayNumber === dayNumber);
        if (!clickedDay) return;
        const wasAlreadyOpen = clickedDay.isOpen;

        const updatedDays = days.map((day) => {
            return (isDecember || isOctober) &&
                day.dayNumber === dayNumber &&
                dayNumber <= currentDay &&
                !day.isOpen
                ? { ...day, isOpen: !day.isOpen }
                : day;
        });
        setDays(updatedDays);

        if ((isDecember || isOctober) && dayNumber <= currentDay) {
            openDay(clickedDay, cell);
            registerDayOpening(dayNumber, wasAlreadyOpen);
        } else {
            const emoji = isOctober ? "👻" : "🎅";
            showToast(`Un peu de patience ${emoji}`);
            registerClosedDayTap(dayNumber);
        }
    };

    const renderDayButton = (day: Day, flexSpan?: number) => (
        <DayButton
            key={day.dayNumber}
            day={day}
            flexSpan={flexSpan}
            handleDayOpening={handleDayOpening}
        />
    );

    if (isOctober) {
        if (days.length < 31) {
            return <View style={styles.octoberContainer} />;
        }

        let cursor = 0;
        const rows = OCTOBER_ROWS_TEMPLATE.map((rowSpans) =>
            rowSpans.map((span) => ({ day: days[cursor++], span })),
        );

        return (
            <View ref={containerRef} style={styles.octoberContainer}>
                {rows.map((row) => (
                    <View key={row[0].day.dayNumber} style={styles.octoberRow}>
                        {row.map(({ day, span }) => renderDayButton(day, span))}
                    </View>
                ))}
            </View>
        );
    }

    return (
        <View ref={containerRef} style={styles.daysContainer}>
            {days.map((d) => renderDayButton(d))}
        </View>
    );
};

const OCTOBER_ROWS_TEMPLATE = [
    [2, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 2],
    [1, 1, 1, 1],
    [1, 2, 1],
    [1, 1, 1, 1],
    [2, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 2],
];

const styles = StyleSheet.create({
    daysContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        backgroundColor: Colors.green,
        padding: 5,
    },
    octoberContainer: {
        flex: 1,
        backgroundColor: Colors.snow,
    },
    octoberRow: {
        flex: 1,
        flexDirection: "row",
    },
});
