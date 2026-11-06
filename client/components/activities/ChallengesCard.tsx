import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIcon } from "@/components/activities/ActivityIcon";
import {
    activityPressed,
    activityRowCard,
    activityRowSubtitle,
    activityRowTitle,
} from "@/components/activities/activityStyles";
import { Colors } from "@/constants/Colors";
import { CHALLENGES } from "@/data/challenges_data";

const TITLE = "Les défis de l'Avent";
const SUBTITLE = `${CHALLENGES.length} mystères à percer`;

export const ChallengesCard: React.FC = () => (
    <Pressable
        onPress={() => router.push("/bingo/challenges" as never)}
        accessibilityRole="button"
        accessibilityLabel={`${TITLE}, ${SUBTITLE}`}
        style={({ pressed }) => [styles.card, pressed && activityPressed]}
    >
        <ActivityIcon
            image={"christmas-sock-white_d5a8mf"}
            backgroundColor={Colors.lightBlue}
            size={44}
        />
        <View style={styles.texts}>
            <ThemedText style={styles.title}>{TITLE}</ThemedText>
            <ThemedText style={styles.subtitle}>{SUBTITLE}</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.blue} />
    </Pressable>
);

const styles = StyleSheet.create({
    card: activityRowCard,
    texts: {
        flex: 1,
    },
    title: {
        ...activityRowTitle,
        color: Colors.blue,
    },
    subtitle: activityRowSubtitle,
});
