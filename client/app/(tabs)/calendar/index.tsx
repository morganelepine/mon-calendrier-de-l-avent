import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Days } from "@/components/days/Days";
import { daysArray } from "@/data/days_data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Day } from "@/interfaces/dayInterface";

export default function CalendarScreen() {
    const [days, setDays] = useState<Day[]>([]);

    useEffect(() => {
        const getCalendar = async () => {
            try {
                const calendar = await AsyncStorage.getItem("calendar");
                if (calendar) {
                    setDays(JSON.parse(calendar));
                } else {
                    setDays(daysArray);
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
                await AsyncStorage.setItem("calendar", JSON.stringify(days));
            } catch (error) {
                console.error("Errror saving calendar", error);
            }
        };
        if (days.length) {
            saveCalendar();
        }
    }, [days]);

    const goToDay = (day: Day) => {
        router.push({
            pathname: "/calendar/day",
            params: { dayId: day.dayNumber },
        });
    };

    return (
        <SafeAreaView
            edges={["top"]}
            style={{
                flex: 1,
            }}
        >
            <Days days={days} setDays={setDays} goToDay={goToDay} />
        </SafeAreaView>
    );
}
