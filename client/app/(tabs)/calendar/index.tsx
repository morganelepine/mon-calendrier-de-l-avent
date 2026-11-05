import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Days } from "@/components/days/Days";
import { daysArray } from "@/data/days_data";
import { octoberDaysArray } from "@/data/days_data_october";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Day } from "@/interfaces/dayInterface";
import { Content } from "@/interfaces/contentInterface";
import { isOctober } from "@/constants/Dates";
import { StorageKeys } from "@/constants/storageKeys";
import { TOP_EDGES } from "@/constants/safeAreaEdges";
import { getContentsByDay } from "@/services/contents/content.service";

const defaultDays = isOctober ? octoberDaysArray : daysArray;
const calendarStorageKey = isOctober
    ? StorageKeys.octoberCalendar
    : StorageKeys.calendar;

export default function CalendarScreen() {
    const [days, setDays] = useState<Day[]>([]);

    useEffect(() => {
        const getCalendar = async () => {
            try {
                const calendar = await AsyncStorage.getItem(calendarStorageKey);
                if (calendar) {
                    setDays(JSON.parse(calendar));
                } else {
                    setDays(defaultDays);
                }
            } catch (error) {
                console.error("Error fetching calendar", error);
            }
        };
        getCalendar();
    }, []);

    const updateDays = async (updatedDays: Day[]) => {
        setDays(updatedDays);
        try {
            await AsyncStorage.setItem(
                calendarStorageKey,
                JSON.stringify(updatedDays),
            );
        } catch (error) {
            console.error("Error saving calendar", error);
        }
    };

    const goToDay = async (day: Day) => {
        // December: 4 contents per day
        if (!isOctober) {
            router.navigate({
                pathname: "/calendar/day/[id]",
                params: { id: String(day.dayNumber) },
            });
            return;
        }

        const params = { id: String(day.dayNumber) };

        let anecdote: Content | undefined;
        let ideas: Content[] = [];
        let games: Content[] = [];
        try {
            ({ anecdote, ideas, games } = await getContentsByDay(
                day.dayNumber,
            ));
        } catch {
            // Let the generic day screen handle/display the error itself.
            router.navigate({ pathname: "/calendar/day/[id]", params });
            return;
        }

        if (anecdote) {
            router.navigate({
                pathname: "/calendar/day/[id]/content/anecdote",
                params,
            });
        } else if (ideas.length > 0) {
            router.navigate({
                pathname: "/calendar/day/[id]/content/idea",
                params,
            });
        } else if (games.length > 0) {
            router.navigate({
                pathname: "/calendar/day/[id]/content/game",
                params,
            });
        } else {
            router.navigate({ pathname: "/calendar/day/[id]", params });
        }
    };

    return (
        <SafeAreaView
            edges={TOP_EDGES}
            style={{
                flex: 1,
            }}
        >
            <Days days={days} setDays={updateDays} goToDay={goToDay} />
        </SafeAreaView>
    );
}
