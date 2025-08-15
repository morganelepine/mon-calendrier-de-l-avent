import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Day25 } from "@/components/days/Day25/Day25";
import { DayContent } from "@/components/days/Content/DayContent";
import { anecdotesData } from "@/data/SheetToJSON.Anecdotes";
import { ideasData } from "@/data/SheetToJSON.Ideas";
import { gamesData } from "@/data/SheetToJSON.Games";
import { storyData } from "@/data/SheetToJSON.Story";
import { Content } from "@/interfaces/contentInterface";

export default function DayScreen() {
    const params = useLocalSearchParams();
    const dayParam = Array.isArray(params.dayId)
        ? params.dayId[0]
        : params.dayId;
    const dayId = dayParam ? parseInt(dayParam, 10) : 0;

    const anecdoteOfTheDay: Content | undefined = anecdotesData.find(
        (anecdote) => anecdote.dayNumber === dayId
    );

    const storyOfTheDay: Content | undefined = storyData.find(
        (story) => story.dayNumber === dayId
    );

    const ideas: Content[] = [];
    ideasData.forEach((idea) => {
        if (idea.dayNumber === dayId) {
            ideas.push(idea);
        }
    });

    const games: Content[] = [];
    gamesData.forEach((game) => {
        if (game.dayNumber === dayId) {
            games.push(game);
        }
    });

    return (
        <View style={styles.background}>
            {dayId === 25 ? (
                <Day25 dayId={dayId} />
            ) : (
                <DayContent
                    anecdoteOfTheDay={anecdoteOfTheDay}
                    storyOfTheDay={storyOfTheDay}
                    ideas={ideas}
                    games={games}
                    dayId={dayId}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: Colors.snow,
    },
});
