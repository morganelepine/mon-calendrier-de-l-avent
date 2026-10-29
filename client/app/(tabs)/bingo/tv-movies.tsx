import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlueBackground } from "@/components/utils/BlueBackground";
import { ThemedText } from "@/components/ThemedText";
import { tvMovieImage } from "@/components/activities/activityStyles";
import { Colors } from "@/constants/Colors";
import { NO_TOP_EDGES } from "@/constants/safeAreaEdges";
import { useTodayTvMovies } from "@/hooks/useTodayTvMovies";
import { TvMovie } from "@/interfaces/tvMovieInterface";
import { formatHour } from "@/utils/hours";

const TvMovieCard: React.FC<{ movie: TvMovie }> = ({ movie }) => {
    const startHour = formatHour(movie.startHour);
    const endHour = formatHour(movie.endHour);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image
                    source={{ uri: movie.image }}
                    style={tvMovieImage}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    accessible={false}
                />
                <View
                    style={styles.schedule}
                    accessible
                    accessibilityLabel={`De ${startHour} à ${endHour} sur ${movie.channel}`}
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
            <ThemedText style={styles.description}>
                {movie.description}
            </ThemedText>
        </View>
    );
};

export default function TvMoviesScreen() {
    const { movies, error } = useTodayTvMovies();

    return (
        <BlueBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView edges={NO_TOP_EDGES} style={styles.list}>
                    {error ? (
                        <ThemedText style={styles.message}>
                            Impossible de charger le programme, réessayez plus
                            tard.
                        </ThemedText>
                    ) : movies === null ? (
                        <ActivityIndicator size="large" color={Colors.snow} />
                    ) : movies.length === 0 ? (
                        <ThemedText style={styles.message}>
                            Pas de téléfilm de Noël aujourd'hui, revenez demain
                            !
                        </ThemedText>
                    ) : (
                        movies.map((movie) => (
                            <TvMovieCard
                                key={`${movie.channel}-${movie.startHour}`}
                                movie={movie}
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
        padding: 20,
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
    message: {
        color: Colors.snow,
        fontFamily: "PoppinsItalic",
        textAlign: "center",
    },
});
