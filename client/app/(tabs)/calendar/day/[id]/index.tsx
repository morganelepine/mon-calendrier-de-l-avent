import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Day25 } from "@/components/days/Day25/Day25";
import { DayContent } from "@/components/days/Content/DayContent";

export default function DayScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const dayId = Number.parseInt(id, 10);

    return (
        <View style={styles.background}>
            {dayId === 25 ? <Day25 /> : <DayContent dayId={dayId} />}
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
