import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Theme } from "@/constants/Colors";

const ITEM_HEIGHT = 44;
const MAX_USERNAME_LENGTH = 24;

interface LeaderBoardItemProps {
    index: number;
    item: { id?: number; username: string; score: number };
    username: string | null;
    onPress?: (item: { id?: number; username: string; score: number }) => void;
    rank?: number;
}

function truncateUsername(name: string): string {
    return name.length > MAX_USERNAME_LENGTH
        ? `${name.slice(0, MAX_USERNAME_LENGTH)}...`
        : name;
}

export const LeaderBoardItem: React.FC<LeaderBoardItemProps> = ({
    index,
    item,
    username,
    onPress,
    rank,
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
                                ? Theme.green
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
                                    : Theme.tint,
                        },
                    ]}
                >
                    {rank ?? index + 1}
                </ThemedText>
                <Pressable
                    style={styles.usernameContainer}
                    onPress={() => onPress?.(item)}
                >
                    <ThemedText
                        numberOfLines={1}
                        style={{
                            fontSize: 15,
                            color:
                                item.username === username
                                    ? Colors.snow
                                    : Theme.tint,
                            fontFamily:
                                item.username === username
                                    ? "PoppinsBold"
                                    : "Poppins",
                        }}
                    >
                        {truncateUsername(item.username)}
                    </ThemedText>
                </Pressable>
                <ThemedText
                    style={[
                        styles.score,
                        {
                            color:
                                item.username === username
                                    ? Colors.snow
                                    : Theme.tint,
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
        paddingHorizontal: 16,
        borderRadius: 22,
        gap: 16,
        borderWidth: 1,
        borderColor: Colors.snow,
        height: ITEM_HEIGHT,
    },
    rank: {
        fontFamily: "PoppinsBold",
        color: Theme.tint,
    },
    usernameContainer: {
        flexShrink: 1,
    },
    score: { fontFamily: "PoppinsBold", color: Theme.tint },
});
