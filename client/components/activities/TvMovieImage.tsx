import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { tvMovieImage } from "@/components/activities/activityStyles";

// Decorative: the title next to it says what the movie is.
export const TvMovieImage: React.FC<{ uri: string | null }> = ({ uri }) =>
    uri ? (
        <Image
            source={{ uri }}
            style={tvMovieImage}
            contentFit="cover"
            cachePolicy="memory-disk"
            accessible={false}
        />
    ) : (
        <View style={[tvMovieImage, styles.placeholder]} accessible={false}>
            <Ionicons name="tv-outline" size={28} color={Colors.snow} />
        </View>
    );

const styles = StyleSheet.create({
    placeholder: {
        backgroundColor: Colors.blue,
        justifyContent: "center",
        alignItems: "center",
    },
});
