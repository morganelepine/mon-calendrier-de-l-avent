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
import { getContentsByDay } from "@/services/content.service";

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

    useEffect(() => {
        const saveCalendar = async () => {
            try {
                await AsyncStorage.setItem(
                    calendarStorageKey,
                    JSON.stringify(days),
                );
            } catch (error) {
                console.error("Errror saving calendar", error);
            }
        };
        if (days.length) {
            saveCalendar();
        }
    }, [days]);

    const goToDay = async (
        day: Day,
        setModalVisible: (modalVisible: boolean) => void,
    ) => {
        setModalVisible(false);

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
            <Days days={days} setDays={setDays} goToDay={goToDay} />
        </SafeAreaView>
    );
}
