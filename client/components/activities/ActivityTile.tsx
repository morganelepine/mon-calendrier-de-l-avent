import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import { Colors } from "@/constants/Colors";
import {
    activityCardBase,
    activityPressed,
} from "@/components/activities/activityStyles";
import { isOctober } from "@/constants/Dates";

interface ActivityTileProps {
    title: string;
    color: string;
    route: string;
    icon: string; // Cloudinary public ID
    // Square by default, but a minimum only: larger system font sizes
    // can grow the tile instead of clipping its text.
    minHeight: number;
}

export const ActivityTile: React.FC<ActivityTileProps> = ({
    title,
    color,
    route,
    icon,
    minHeight,
}) => (
    <Pressable
        onPress={() => router.push(`/bingo/${route}` as never)}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => [
            styles.tile,
            { backgroundColor: color, minHeight },
            pressed && activityPressed,
        ]}
    >
        <ActivityIcon
            image={icon}
            backgroundColor="rgba(255, 255, 255, 0.2)"
            size={48}
        />
        <ThemedText style={styles.title}>{title}</ThemedText>
    </Pressable>
);

const styles = StyleSheet.create({
    tile: {
        ...activityCardBase,
        flex: 1,
        flexDirection: isOctober ? "row" : "column",
        justifyContent: isOctober ? "flex-start" : "center",
        alignItems: isOctober ? "center" : "flex-start",
        gap: isOctober ? 16 : 4,
    },
    title: {
        fontSize: isOctober ? 20 : 16,
        fontFamily: "FreightNeoBold",
        color: Colors.snow,
    },
});
