import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { TvMovieImage } from "@/components/activities/TvMovieImage";
import { TvMovieStatusBadge } from "@/components/activities/TvMovieStatusBadge";
import { Colors } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";
import { useTvMoviesSchedule } from "@/hooks/useTvMoviesSchedule";
import { useCurrentMinutes } from "@/hooks/useCurrentMinutes";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { formatHour, isBetween } from "@/utils/hours";

const TvMovieCard: React.FC<{ movie: TvMovie; onAir: boolean }> = ({
    movie,
    onAir,
}) => {
    const startHour = formatHour(movie.startHour);
    const endHour = formatHour(movie.endHour);

    return (
        <View style={[styles.card, onAir && styles.onAirCard]}>
            {onAir ? <TvMovieStatusBadge status="live" /> : null}
            <View style={[styles.header, { marginTop: onAir ? 10 : 0 }]}>
                <TvMovieImage uri={movie.image} />
                <View
                    style={styles.schedule}
                    accessible
                    accessibilityLabel={`${onAir ? "En cours, " : ""}De ${startHour} à ${endHour} sur ${movie.channel}`}
                >
                    <ThemedText style={styles.hour}>
                        {startHour} – {endHour}
                    </ThemedText>
                    <ThemedText style={styles.channel}>
                        {movie.channel}
                    </ThemedText>
                </View>
            </View>
            <ThemedText style={styles.title} accessibilityRole="header">
                {movie.title}
            </ThemedText>
            {movie.description && (
                <ThemedText style={styles.description}>
                    {movie.description}
                </ThemedText>
            )}
        </View>
    );
};

export default function TvMoviesScreen() {
    const { day, movies, error } = useTvMoviesSchedule();
    const nowMinutes = useCurrentMinutes();
    const isTomorrow = day === "tomorrow";

    return (
        <BlueBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView edges={NO_TOP_EDGES} style={styles.list}>
                    {isTomorrow ? (
                        <ThemedText
                            style={styles.dayTitle}
                            accessibilityRole="header"
                        >
                            Les téléfilms du jour sont terminés.{"\n"}Au
                            programme demain :
                        </ThemedText>
                    ) : null}
                    {error ? (
                        <ThemedText style={styles.message}>
                            Impossible de charger le programme, réessayez plus
                            tard.
                        </ThemedText>
                    ) : movies === null ? (
                        <ActivityIndicator size="large" color={Colors.snow} />
                    ) : movies.length === 0 ? (
                        <ThemedText style={styles.message}>
                            {isTomorrow
                                ? "Pas de téléfilm de Noël demain."
                                : "Pas de téléfilm de Noël aujourd'hui, revenez demain !"}
                        </ThemedText>
                    ) : (
                        movies.map((movie) => (
                            <TvMovieCard
                                key={`${movie.channel}-${movie.startHour}`}
                                movie={movie}
                                onAir={
                                    !isTomorrow &&
                                    isBetween(
                                        nowMinutes,
                                        movie.startHour,
                                        movie.endHour,
                                    )
                                }
                            />
                        ))
                    )}
                </SafeAreaView>
            </ScrollView>
        </BlueBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    list: {
        gap: 16,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: Colors.snow,
        opacity: 0.9,
        gap: 4,
    },
    onAirCard: {
        borderWidth: 4,
        borderColor: Colors.red,
        opacity: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    schedule: {
        flex: 1,
    },
    hour: {
        fontSize: 18,
        fontFamily: "FreightNeoBold",
        color: Colors.red,
    },
    channel: {
        fontSize: 14,
        color: Colors.blue,
    },
    title: {
        fontSize: 20,
        fontFamily: "FreightNeoBold",
        color: Colors.blue,
    },
    description: {
        fontSize: 14,
    },
    dayTitle: {
        color: Colors.snow,
        fontFamily: "FreightNeo",
        fontSize: 18,
        textAlign: "center",
    },
    message: {
        color: Colors.snow,
        fontFamily: "PoppinsItalic",
        textAlign: "center",
    },
});
