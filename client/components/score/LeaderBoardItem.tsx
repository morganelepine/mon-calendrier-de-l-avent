import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

const ITEM_HEIGHT = 44;

interface LeaderBoardItemProps {
    index: number;
    item: { username: string; score: number };
    username: string | null;
}

export const LeaderBoardItem: React.FC<LeaderBoardItemProps> = ({
    index,
    item,
    username,
}) => {
    return (
        <View
            style={[{ marginHorizontal: 20 }, index === 0 && { marginTop: 20 }]}
        >
            <View
                style={[
                    styles.row,
                    {
                        backgroundColor:
                            item.username === username
                                ? Colors.green
                                : Colors.snow,
                    },
                ]}
            >
                <ThemedText
                    style={[
                        styles.rank,
                        {
                            color:
                                item.username === username
                                    ? Colors.snow
                                    : Colors.blue,
                        },
                    ]}
                >
                    {index + 1}
                </ThemedText>
                <ThemedText
                    style={{
                        flex: 1,
                        color:
                            item.username === username
                                ? Colors.snow
                                : Colors.blue,
                        fontFamily:
                            item.username === username
                                ? "PoppinsBold"
                                : "Poppins",
                    }}
                >
                    {item.username}
                </ThemedText>
                <ThemedText
                    style={[
                        styles.score,
                        {
                            color:
                                item.username === username
                                    ? Colors.snow
                                    : Colors.blue,
                        },
                    ]}
                >
                    {item.score}
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        paddingTop: 3,
        paddingHorizontal: 16,
        borderRadius: 22,
        gap: 16,
        borderWidth: 1,
        borderColor: Colors.snow,
        height: ITEM_HEIGHT,
    },
    rank: {
        fontFamily: "PoppinsBold",
        color: Colors.blue,
    },
    score: { fontFamily: "PoppinsBold", color: Colors.blue },
});
