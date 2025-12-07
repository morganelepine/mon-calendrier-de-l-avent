import { View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { removeMember } from "@/services/group.service";

const ITEM_HEIGHT = 44;

interface LeaderBoardItemProps {
    index: number;
    item: { id?: number; username: string; score: number };
    username: string | null;
    groupId?: number;
    onRemove?: (id: number) => void;
}

export const LeaderBoardItem: React.FC<LeaderBoardItemProps> = ({
    index,
    item,
    username,
    groupId,
}) => {
    const removeMemberFromGroup = async () => {
        if (!groupId || !item.id || item.username === username) return;
        await removeMember(groupId, item.id);
        router.replace(`/scores/group`);
    };

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
                <Pressable onPress={removeMemberFromGroup}>
                    <ThemedText
                        style={{
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
                </Pressable>
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
