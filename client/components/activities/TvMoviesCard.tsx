import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import {
    activityCardBase,
    activityPressed,
    tvMovieImage,
} from "@/components/activities/activityStyles";
import { Colors } from "@/constants/Colors";
import { getNow } from "@/constants/Dates";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { MINUTES_IN_DAY, formatHour, toMinutes } from "@/utils/hours";

const getCurrentMinutes = (): number => {
    const now = new Date(getNow());
    return now.getHours() * 60 + now.getMinutes();
};

interface FeaturedMovie {
    movie: TvMovie;
    // 0-1 elapsed share while on air, null for the next one.
    progress: number | null;
}

// Premieres air on TF1: when several movies overlap, the first channel
// listed wins. Names as returned by our server; unknown channels come last.
const CHANNEL_PRIORITY = ["TF1", "TMC", "TF1 Séries Films", "Gulli"];

const channelRank = (channel: string): number => {
    const rank = CHANNEL_PRIORITY.indexOf(channel);
    return rank === -1 ? CHANNEL_PRIORITY.length : rank;
};

interface TimedMovie {
    movie: TvMovie;
    start: number;
    end: number;
}

const byChannelPriority = (a: TimedMovie, b: TimedMovie): number =>
    channelRank(a.movie.channel) - channelRank(b.movie.channel);

// On air first, else the next one to start.
// Device time is assumed to be French time, like the schedule.
const getFeaturedMovie = (
    movies: TvMovie[],
    nowMinutes: number,
): FeaturedMovie | null => {
    const timed: TimedMovie[] = movies.map((movie) => {
        const start = toMinutes(movie.startHour);
        let end = toMinutes(movie.endHour);
        if (end <= start) end += MINUTES_IN_DAY; // ends after midnight
        return { movie, start, end };
    });

    const [live] = timed
        .filter(({ start, end }) => nowMinutes >= start && nowMinutes < end)
        .sort(byChannelPriority);
    if (live) {
        return {
            movie: live.movie,
            progress: (nowMinutes - live.start) / (live.end - live.start),
        };
    }

    const upcoming = timed.filter(({ start }) => start > nowMinutes);
    if (upcoming.length === 0) return null;
    const nextStart = Math.min(...upcoming.map(({ start }) => start));
    const [next] = upcoming
        .filter(({ start }) => start === nextStart)
        .sort(byChannelPriority);
    return { movie: next.movie, progress: null };
};

export const TvMoviesCard: React.FC<{ movies: TvMovie[] }> = ({ movies }) => {
    const [nowMinutes, setNowMinutes] = useState(getCurrentMinutes);

    useEffect(() => {
        const interval = setInterval(
            () => setNowMinutes(getCurrentMinutes()),
            60 * 1000,
        );
        return (): void => clearInterval(interval);
    }, []);

    const featured = getFeaturedMovie(movies, nowMinutes);
    const isLive = featured?.progress != null;

    return (
        <View style={styles.card}>
            {featured ? (
                <>
                    <View style={styles.statusRow}>
                        <View style={styles.status}>
                            {isLive ? <View style={styles.liveDot} /> : null}
                            <ThemedText style={styles.statusText}>
                                {isLive ? "En cours" : "À suivre"}
                            </ThemedText>
                        </View>
                        <ThemedText style={styles.schedule}>
                            {isLive
                                ? `sur ${featured.movie.channel} jusqu'à ${formatHour(featured.movie.endHour)}`
                                : `sur ${featured.movie.channel} à ${formatHour(featured.movie.startHour)}`}
                        </ThemedText>
                    </View>

                    <View style={styles.movie}>
                        <Image
                            source={{ uri: featured.movie.image }}
                            style={tvMovieImage}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                            accessible={false}
                        />
                        <View style={styles.movieTexts}>
                            <ThemedText
                                style={styles.title}
                                accessibilityRole="header"
                            >
                                {featured.movie.title}
                            </ThemedText>
                            {isLive ? (
                                <View
                                    style={styles.progressTrack}
                                    accessible
                                    accessibilityRole="progressbar"
                                    accessibilityLabel="Avancement du téléfilm"
                                    accessibilityValue={{
                                        min: 0,
                                        max: 100,
                                        now: Math.round(
                                            (featured.progress ?? 0) * 100,
                                        ),
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.progressBar,
                                            {
                                                width: `${(featured.progress ?? 0) * 100}%`,
                                            },
                                        ]}
                                    />
                                </View>
                            ) : null}
                        </View>
                    </View>
                </>
            ) : null}

            <Pressable
                onPress={() => router.push("/bingo/tv-movies" as never)}
                accessibilityRole="button"
                style={({ pressed }) => [
                    styles.button,
                    pressed && activityPressed,
                ]}
            >
                <Ionicons name="time-outline" size={20} color={Colors.blue} />
                <ThemedText style={styles.buttonText}>
                    Tous les téléfilms du jour
                </ThemedText>
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={Colors.blue}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        ...activityCardBase,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        gap: 12,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
    },
    status: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: Colors.blue,
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingTop: 2,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.snow,
    },
    statusText: {
        fontSize: 12,
        fontFamily: "PoppinsBold",
        color: Colors.snow,
        paddingTop: 1,
        textTransform: "uppercase",
    },
    schedule: {
        // Wraps instead of being cut off at the row edge (Android).
        flexShrink: 1,
        fontSize: 13,
        color: Colors.snow,
    },
    movie: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    movieTexts: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontSize: 20,
        fontFamily: "FreightNeoBold",
        paddingTop: 0,
        color: Colors.snow,
    },
    progressTrack: {
        height: 4,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginTop: 4,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: Colors.gold,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    buttonText: {
        flex: 1,
        fontSize: 14,
        fontFamily: "PoppinsBold",
        color: Colors.blue,
    },
});
